<script setup lang="ts">
import {computed,reactive,ref} from 'vue';
import {SelerisScanner,validateProfile,type SelerisProfile,type ScanResult} from '@seleris/rppg-vue';
const assetBaseUrl = `${import.meta.env.BASE_URL}vendor/seleris-rppg/0.1.0-dev.3/`;
const form=reactive<any>({age:'',sex:'',heightCm:'',weightKg:'',lifestyle:{}});
const profile=ref<SelerisProfile|null>(null),consent=ref(false),scanner=ref<any>(),ready=ref(false),busy=ref(false),heatmap=ref(true),heatmapReady=ref(false);
const result=ref<ScanResult|null>(null),error=ref(''),guidance=ref(''),progress=ref(0),sqi=ref<number|null>(null),liveHr=ref<number|null>(null);
const questions=[['smoking','Merokok'],['alcohol','Konsumsi alkohol'],['motorcycle','Mengendarai sepeda motor']]
  .map(([key,label])=>({key,label,options:[[false,'Tidak'],[true,'Ya']]}));
const labels={heartRate:'Heart Rate',breathingRate:'Breath Rate',hrv:'HRV · SDNN',systolic:'Systole',diastolic:'Diastole'};
const cards=computed(()=>Object.entries(labels).map(([key,label])=>({key,label,metric:result.value?.metrics[key as keyof typeof labels]})));
function submit(){
  error.value='';const p=structuredClone(JSON.parse(JSON.stringify(form)));
  const issues=validateProfile(p);
  if(issues.length){error.value=issues.map(i=>`${i.field}: ${i.message}`).join(' ');return;}
  if(!consent.value){error.value='Berikan izin pemrosesan lokal sebelum melanjutkan.';return;}
  profile.value=p;guidance.value='Menyiapkan scanner…';
}
function fail(e:any){error.value=e.message||e.code;busy.value=false;liveHr.value=null;}
async function scan(retry=false){error.value='';result.value=null;progress.value=0;liveHr.value=null;busy.value=true;try{await(retry?scanner.value.retry():scanner.value.start());}catch(e){fail(e);}}
async function cancel(){await scanner.value.cancel();busy.value=false;liveHr.value=null;}
function finish(value:ScanResult){result.value=value;busy.value=false;liveHr.value=null;}
function state(value:any){guidance.value=value.guidance||value.stage;if(['cancelled','failed','completedInsufficient'].includes(value.stage)){busy.value=false;liveHr.value=null;}}
async function downloadHeatmap(){try{const blob=await scanner.value.exportHeatmap({composite:true});download(blob,'seleris-heatmap.png');}catch(e){fail(e);}}
function download(blob:Blob,name:string){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
async function changeProfile(){await scanner.value?.dispose();profile.value=null;ready.value=false;result.value=null;heatmapReady.value=false;error.value='';}
</script>

<template>
  <header><a class="brand" href="/">seleris<span>LOCAL SCAN</span></a><span class="pill">Pemrosesan di perangkat Anda</span></header>
  <main>
    <section class="intro"><p class="eyebrow">PENGUKURAN WAJAH</p><h1>Lima parameter.<br>Satu pemindaian.</h1><p>Posisikan wajah di tengah, gunakan cahaya dari depan, lepas kacamata, dan tetap diam selama pemindaian.</p></section>
    <form v-if="!profile" class="panel profile" @submit.prevent="submit">
      <h2>Profil pengguna</h2><p>Isi profil sebelum scan untuk perhitungan tekanan darah dan parameter yang menggunakan profil.</p>
      <div class="fields">
        <label>Usia (tahun)<input v-model.number="form.age" type="number" min="17" max="100" step="1" required></label>
        <label>Jenis kelamin<select aria-label="Jenis kelamin" v-model="form.sex" required><option disabled value="">Pilih</option><option value="Male">Laki-laki</option><option value="Female">Perempuan</option></select></label>
        <label>Tinggi badan (cm)<input v-model.number="form.heightCm" type="number" min="100" max="250" step="0.1" required></label>
        <label>Berat badan (kg)<input v-model.number="form.weightKg" type="number" min="20" max="400" step="0.1" required></label>
        <label v-for="q in questions" :key="q.key">{{q.label}}<select :aria-label="q.label" v-model="form.lifestyle[q.key]" required><option :value="undefined" disabled>Pilih</option><option v-for="[value,label] in q.options" :value="value">{{label}}</option></select></label>
      </div>
      <label class="check"><input v-model="consent" type="checkbox" required>Saya setuju kamera dan profil diproses secara lokal untuk pemindaian ini.</label>
      <button type="submit">Lanjut ke pemindaian →</button>
    </form>
    <section v-else class="scan-layout">
      <div class="panel camera-panel">
        <div class="camera"><SelerisScanner ref="scanner" :profile="profile" :asset-base-url="assetBaseUrl" :heatmap-enabled="heatmap" @ready="ready=true;guidance='Scanner siap'" @state="state" @progress="progress=$event.value" @quality="sqi=$event.score" @live-vitals="liveHr=$event.heartRate" @heatmap-status="heatmapReady=$event.visible" @result="finish" @error="fail" /></div>
        <div class="scan-info"><div class="status" aria-live="polite">{{guidance}}</div><progress :value="progress" max="1"></progress><div class="telemetry"><span>HR sementara <b>{{liveHr??'—'}}</b> bpm</span><span>SQI <b>{{sqi===null?'—':sqi.toFixed(2)}}</b></span></div>
          <div class="actions"><button :disabled="!ready||busy" @click="scan(!!result)">{{result?'Scan ulang':'Mulai scan'}}</button><button class="secondary" :disabled="!busy" @click="cancel">Batalkan</button></div>
          <label class="check"><input v-model="heatmap" type="checkbox">Tampilkan heatmap perfusi</label><button class="text-button" :disabled="!heatmapReady&&!result" @click="downloadHeatmap">Simpan heatmap PNG</button>
        </div>
      </div>
      <aside><h2>Hasil pemindaian</h2><p>Hasil akhir muncul setelah pemindaian selesai dan kualitas sinyal memenuhi syarat.</p><div class="cards"><article v-for="card in cards" :key="card.key" class="panel metric"><h3>{{card.label}}</h3><div class="value">{{card.metric?.value??'—'}} <small>{{card.metric?.unit}}</small></div><p v-if="card.metric">{{card.metric.source==='formula_estimate'?'Estimasi berbasis formula dan profil':card.metric.source==='camera_experimental'?'Estimasi eksperimental dari kamera':'Dari sinyal kamera'}}</p></article></div><button v-if="result" class="secondary" @click="download(new Blob([JSON.stringify(result,null,2)],{type:'application/json'}),'seleris-result.json')">Simpan hasil JSON</button><button class="text-button" :disabled="busy" @click="changeProfile">Ubah profil</button></aside>
    </section>
    <p v-if="error" class="error" role="alert">{{error}}</p>
    <footer>Contoh integrasi SDK · build pengembangan 0.1.0-dev.3 · referensi Mobile 1.9.2</footer>
  </main>
</template>
