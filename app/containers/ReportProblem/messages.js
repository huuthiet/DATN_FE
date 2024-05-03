/*
 * ReportProblem Messages
 *
 * This contains all the text for the ReportProblem container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'ReportProblem.containers';

export default defineMessages({
  idReportProblem: {
    id: `${scope}.idReportProblem`,
    defaultMessage: 'Mã Sự Cố',
  },
  dateReportProblem: {
    id: `${scope}.dateReportProblem`,
    defaultMessage: 'Ngày Lập',
  },
  motelRoom: {
    id: `${scope}.motelRoom`,
    defaultMessage: 'Tên Khu Trọ',
  },
  room: {
    id: `${scope}.room`,
    defaultMessage: 'Tên Phòng',
  },
  user: {
    id: `${scope}.user`,
    defaultMessage: 'Tên Khách',
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: 'Trạng Thái',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Nội dung',
  },
  image: {
    id: `${scope}.image`,
    defaultMessage: 'Ảnh Sự Cố',
  },
});
