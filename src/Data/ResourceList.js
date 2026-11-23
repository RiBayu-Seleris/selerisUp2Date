import ResourceBlog from "@/components/icons/ResourceBlog.vue";
import ResourceCareer from "@/components/icons/ResourceCareer.vue";
import ResourceWorkshop from "@/components/icons/ResourceWorkshop.vue";
import { healthPricing360 } from "@/Data/workshops/healthpricing360";
import { isWorkshopHighlighted } from "@/utils/workshopStatus";

export const resourceList = [
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
    url: healthPricing360.path,
    icon: ResourceWorkshop,
    isNew: isWorkshopHighlighted(healthPricing360),
    isHidden: !healthPricing360.isPublished,
  },
].filter((resource) => !resource.isHidden);
