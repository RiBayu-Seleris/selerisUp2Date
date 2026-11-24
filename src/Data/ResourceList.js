import { computed } from "vue";
import ResourceBlog from "@/components/icons/ResourceBlog.vue";
import ResourceCareer from "@/components/icons/ResourceCareer.vue";
import ResourceWorkshop from "@/components/icons/ResourceWorkshop.vue";
import { WORKSHOP_DYNAMIC, WORKSHOP_LIST_PATH } from "@/Data/workshops";
import { sentrisWorkshops } from "@/consumeAPI/workshopsApi";
import { workshopStatus } from "@/utils/workshopStatus";

export const resourceList = computed(() => {
  const workshops = WORKSHOP_DYNAMIC ? sentrisWorkshops.value || [] : [];
  return [
    {
      key: "blogs",
      url: "/blogs",
      icon: ResourceBlog,
      isNew: false,
    },
    {
      key: "careers",
      url: "/careers",
      icon: ResourceCareer,
      isNew: false,
    },
    {
      key: "workshops",
      url: WORKSHOP_LIST_PATH,
      activePrefix: "/workshop",
      icon: ResourceWorkshop,
      isNew: workshops.some((item) => workshopStatus(item) === "open"),
    },
  ];
});
