import ResourceBlog from "@/components/icons/ResourceBlog.vue";
import ResourceCareer from "@/components/icons/ResourceCareer.vue";
import ResourceWorkshop from "@/components/icons/ResourceWorkshop.vue";
import {
  WORKSHOP_LIST_PATH,
  hasPublishedWorkshops,
  publishedWorkshops,
} from "@/Data/workshops";
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
    url: WORKSHOP_LIST_PATH,
    activePrefix: "/workshop",
    icon: ResourceWorkshop,
    isNew: publishedWorkshops.some((workshop) =>
      isWorkshopHighlighted(workshop),
    ),
    isHidden: !hasPublishedWorkshops,
  },
].filter((resource) => !resource.isHidden);
