/*
 * RentTerm Messages
 *
 * This contains all the text for the RentTerm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.RentTerm';

export default defineMessages({
    header: {
        id: `${scope}.header`,
        defaultMessage: 'This is the RentTerm component!',
    },
    home: {
        id: `${scope}.home`,
        defaultMessage: 'ĐIỀU KHOẢN CHO THUÊ',
    },
    Text1: {
        id: `${scope}.Text1`,
        defaultMessage: 'Điều 1: Quyền và Trách nhiệm của Bên A (Cho Thuê)',
    },
    Text1_1: {
        id: `${scope}.Text1_1`,
        defaultMessage: 'Bàn giao cho Bên B phòng ở diện tích sử dụng cùng các thiết bị đi kèm (Kèm theo phụ lục) ngay sau khi ký Hợp đồng. Số lượng, chủng loại và chất lượng các thiết bị được ghi trong Biên bản bàn giao đính kèm Hợp đồng thuê phòng ở này với chữ ký của Đại diện hai bên.',
    },
    Text1_2: {
        id: `${scope}.Text1_2`,
        defaultMessage: 'Bảo đảm quyền sử dụng riêng biệt cho bên B trong suốt thời gian thuê theo Hợp đồng.',
    },
    Text1_3: {
        id: `${scope}.Text1_3`,
        defaultMessage: 'Bảo đảm quyền sử dụng trọn vẹn và riêng rẽ của Bên B đối với phần diện tích cho thuê đã nói ở Điều1.',
    },
    Text1_4: {
        id: `${scope}.Text1_4`,
        defaultMessage: 'Tạo mọi điều kiện cho Bên B trong việc sử dụng căn phòng, đảm bảo về quyền sử dụng dịch vụ công cộng của các nhà cung cấp co bên thuê.',
    },
    Text1_5: {
        id: `${scope}.Text1_5`,
        defaultMessage: 'Phối hợp và giúp đỡ bên thuê trong những vấn đề liên quan đến bên thứ 3 nếu có phát sinh và pháp luật có quy định bắt buộc (Mọi chi phí nếu có thuộc bên A).',
    },
    Text1_6: {
        id: `${scope}.Text1_6`,
        defaultMessage: 'Không được tăng giá cho thuê phòng ở trong suốt thời gian của hợp đồng thuê phòng ở. Trường hợp hai bên tái tục hợp đồng theo thời hạn mới thì Bên B có thể tăng giá cho thuê phòng ở theo giá thị trường tại thời điểm ký kết nhưng không được vượt quá 10% tổng hợp đồng trước đó.',
    },
    Text1_7: {
        id: `${scope}.Text1_7`,
        defaultMessage: 'Để đảm bảo an ninh và việc sử dụng căn phòng đúng mục đích sử dụng, Bên A có quyền kiểm tra đột xuất phòng ở của Bên B với tần suất tối thiểu 02 lần/tháng hoặc bất cứ lúc nào khi có biểu hiện khác thường và bị mọi người xung quanh phản ánh hoặc có lệnh của công an phường hoặc có biểu hiện bất thường so với quy định của pháp luật.',
    },
    Text1_8: {
        id: `${scope}.Text1_8`,
        defaultMessage: 'Bên A có quyền đơn phương chấm dứt Hợp đồng và yêu cầu bồi thường thiệt hại nếu Bên B có một trong những hành vi dưới đây:',
    },
    Text1_9: {
        id: `${scope}.Text1_9`,
        defaultMessage: 'Bên B sử dụng phòng không đúng mục đích thuê như thỏa thuận',
    },
    Text1_10: {
        id: `${scope}.Text1_10`,
        defaultMessage: 'Bên B tự ý đục phá, tháo gỡ các trang thiết bị phòng đang thuê khi chưa có sự đồng ý của Bên A.',
    },
    Text1_11: {
        id: `${scope}.Text1_11`,
        defaultMessage: 'Bên B không thực hiện đúng thỏa thuận tại Điều 3.',
    },
    Text3: {
        id: `${scope}.Text3`,
        defaultMessage: 'Bên B không thực hiện đúng thỏa thuận tại Điều 3.',
    },
    Text3_1: {
        id: `${scope}.Text3_1`,
        defaultMessage: 'Số tiền thuê phòng gồm (i) Giá thuê phòng và (ii) phí dịch vụ kèm',
    },
    Text3_1_1: {
        id: `${scope}.Text3_1_1`,
        defaultMessage: 'Giá thuê phòng: (tiền thuê mỗi tháng, gồm được ưu đãi giảm giá)…………………VNĐ (Bằng chữ........................... ), được cố định kể từ khi ký Hợp đồng đến hết thời gian thuê.',
    },
    Text3_1_2: {
        id: `${scope}.Text3_1_2`,
        defaultMessage: 'Phí sử dụng dịch vụ: Bên A cung cấp các dịch vụ đi kèm như: điện, nước, điện thoại, internet, dọn vệ sinh...(đính kèm Phụ lục số 01 về danh mục và đơn giá mỗi dịch vụ).',
    },
    Text3_2: {
        id: `${scope}.Text3_2`,
        defaultMessage: 'Giá trên không bao gồm thuế VAT, thuế môn bài, thuế nhà hoặc các loại thuế khác (nếu có).',
    },
    Text3_3: {
        id: `${scope}.Text3_3`,
        defaultMessage: 'Phương thức thanh toán:',
    },
    Text3_3_1: {
        id: `${scope}.Text3_3_1`,
        defaultMessage: 'Ngay khi bên A bàn giao và Bên B nhận phòng để sử dụng theo Biên bản bàn giao Phòng, Bên B thanh toán ngay tiền thuê phòng tương ứng với hết số ngày của tháng thuê phòng (số ngày thực tế của tháng x (nhân) Giá thuê phòng/30 ngày), không bao gồm Phí sử dụng dịch vụ phòng.',
    },
    Text3_3_2: {
        id: `${scope}.Text3_3_2`,
        defaultMessage: 'Tiền thuê phòng ở được thanh toán 01 tháng một lần và được thanh toán vào các ngày từ 01 đến ngày 05 của tháng đầu kỳ thanh toán.',
    },
    Text3_3_3: {
        id: `${scope}.Text3_3_3`,
        defaultMessage: 'Đơn vị giao dịch và thanh toán là Đồng Việt',
    },
    Text3_3_4: {
        id: `${scope}.Text3_3_4`,
        defaultMessage: 'Tiền cọc, để đảm bảo cung cấp dịch vụ cho Bên B được tốt nhất, Bên B sẽ đặt cọc Bên A số tiền tương ứng với … tháng Giá thuê phòng được nêu tại Điều này.',
    },
});