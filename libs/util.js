import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/zh-cn";

export const formatDateFromNow = (date) => {
  if (date) return dayjs(date).locale("zh-cn").fromNow();
  else return "";
};
