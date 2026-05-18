export enum GameStatus {
  HOME = 'HOME',
  PLAYING = 'PLAYING',
  CORRECT = 'CORRECT',
  GAMEOVER = 'GAMEOVER',
  LEADERBOARD = 'LEADERBOARD',
}

export interface Level {
  id: number;
  image?: string;
  images?: string[];
  imageCaptions?: string[];
  answer: string;
  definition: string;
  application: string;
  hint: string;
  aliases?: string[];
}

export const LEVELS: Level[] = [
  {
    id: 1,
    images: [
      '/src/assets/images/level_1/image1.png',
      '/src/assets/images/level_1/image2.png',
      '/src/assets/images/level_1/image3.png',
    ],
    imageCaptions: ['Tiêu đề giật tít', 'Ký hiệu sai', 'Báo in'],
    image: '/src/assets/images/level_1/image1.png',
    answer: 'TIN GIẢ',
    aliases: ['TIN GIA', 'FAKE NEWS'],
    definition: "Tin giả là thông tin sai sự thật được phát tán có chủ đích, thường giật tít gây sốc để thu hút clicks. Thuật toán mạng xã hội ưu tiên nội dung gây phản ứng cảm xúc mạnh nên tin giả lan nhanh hơn tin thật.",
    application: 'Trước khi chia sẻ một tin tức, hãy tự hỏi: nguồn này từ đâu? Có báo chính thống nào đưa tin không? Đây là bước đầu tiên để không vô tình trở thành người phát tán tin giả.',
    hint: 'Đây là loại thông tin được tạo ra cố ý để gây hiểu lầm, thường lan truyền rất nhanh trên mạng xã hội vì đánh vào cảm xúc người đọc.',
  },
  {
    id: 2,
    images: [
      '/src/assets/images/level_2/image_1.png',
      '/src/assets/images/level_2/image_2.png',
      '/src/assets/images/level_2/image_3.png',
    ],
    imageCaptions: ['Biểu tượng share', 'Đám đông chỉ 1 hướng', 'Ánh mắt đồng bộ'],
    image: '/src/assets/images/level_2/image_1.png',
    answer: 'TÂM LÝ ĐÁM ĐÔNG',
    aliases: ['TAM LY DAM DONG', 'DAM DONG', 'HERD MENTALITY'],
    definition: 'Khi nhiều người cùng tin vào một thông tin, não bộ tự động giảm đề kháng phản biện – dù thông tin đó chưa được kiểm chứng. Đây là nguyên nhân chính khiến tin giả lan rộng.',
    application: 'Khi thấy bài viết có hàng ngàn lượt chia sẻ, đừng vội tin. Lượt share không phải bằng chứng sự thật. Hãy kiểm tra độc lập thay vì đi theo đám đông.',
    hint: "Hiện tượng xảy ra khi con người tự động tin và làm theo số đông mà không kiểm chứng – chỉ vì 'mọi người đều nói vậy'.",
  },
  {
    id: 3,
    images: [
      '/src/assets/images/level_3/image_1.png',
      '/src/assets/images/level_3/image_2.png',
      '/src/assets/images/level_3/image_3.png',
    ],
    imageCaptions: ['Trao đổi hai chiều', 'Mạng lưới kết nối', 'Liên kết đa cấp'],
    image: '/src/assets/images/level_3/image_1.png',
    answer: 'MỐI LIÊN HỆ PHỔ BIẾN',
    aliases: ['MOI LIEN HE PHO BIEN', 'UNIVERSAL CONNECTION'],
    definition: 'Là sự ràng buộc, quy định và tác động lẫn nhau giữa các sự vật, hiện tượng. Một tin tức trên mạng không tồn tại độc lập – nó bị ảnh hưởng bởi nguồn tin, thuật toán, lợi ích và tâm lý người đọc.',
    application: 'Khi thấy tin "việc nhẹ lương cao", đừng chỉ nhìn mức lương – hãy xét toàn bộ các mối liên hệ: uy tín công ty, hợp đồng, phản hồi cộng đồng, bối cảnh kinh tế.',
    hint: 'Phạm trù triết học nói rằng không có sự vật nào tồn tại biệt lập – mọi thứ đều ràng buộc, quy định và tác động lẫn nhau.',
  },
  {
    id: 4,
    images: [
      '/src/assets/images/level_4/image_1.png',
      '/src/assets/images/level_4/image_2.png',
      '/src/assets/images/level_4/image_3.png',
      '/src/assets/images/level_4/image_4.png',
    ],
    imageCaptions: ['Nguyên tắc cơ bản', 'Ghép mảnh toàn cảnh', 'Tầm nhìn toàn cầu', 'Nhìn từ nhiều hướng'],
    image: '/src/assets/images/level_4/image_1.png',
    answer: 'NGUYÊN TẮC TOÀN DIỆN',
    aliases: ['NGUYEN TAC TOAN DIEN', 'COMPREHENSIVE PRINCIPLE'],
    definition: 'Khi tiếp nhận thông tin, không được xem xét rời rạc, một chiều. Phải kiểm tra nguồn gốc, động cơ, bối cảnh: Nguồn tin từ đâu? Tại sao xuất hiện lúc này? Có mâu thuẫn với các nguồn chính thống khác không?',
    application: 'Trước khi kết luận về bất kỳ thông tin nào, hãy kiểm tra ít nhất 2–3 nguồn độc lập. Tìm ra mối liên hệ bản chất chính là tìm ra sự thật khách quan đằng sau những hiện tượng gây sốc trên mạng.',
    hint: 'Nguyên tắc được rút ra từ mối liên hệ phổ biến: khi xem xét bất kỳ sự vật nào cũng phải đặt nó trong tổng thể các mối liên hệ, tránh nhìn nhận phiến diện một chiều.',
  },
  {
    id: 5,
    images: [
      '/src/assets/images/level_5/image_1.png',
      '/src/assets/images/level_5/image_2.png',
      '/src/assets/images/level_5/image_3.png',
    ],
    imageCaptions: ['Tiến bộ liên tục', 'Đường cong tăng trưởng', 'Phát triển với thử thách'],
    image: '/src/assets/images/level_5/image_1.png',
    answer: 'SỰ PHÁT TRIỂN',
    aliases: ['SU PHAT TRIEN', 'DEVELOPMENT'],
    definition: 'Phát triển là quá trình vận động từ thấp đến cao, từ kém hoàn thiện đến hoàn thiện hơn, diễn ra theo đường xoáy ốc – có thể có bước thụt lùi tạm thời nhưng tổng thể vẫn tiến lên.',
    application: 'Môi trường thông tin ngày càng phức tạp: từ báo giấy → mạng xã hội → AI. Các thủ thuật thao túng truyền thông cũng tinh vi hơn. Nếu không phát triển kỹ năng lọc thông tin, bạn sẽ bị tụt hậu.',
    hint: 'Theo phép biện chứng duy vật, đây là quá trình vận động từ thấp đến cao, từ kém hoàn thiện đến hoàn thiện hơn – không phải mọi sự thay đổi đều là khái niệm này.',
  },
  {
    id: 6,
    images: [
      '/src/assets/images/level_6/image_1.png',
      '/src/assets/images/level_6/image_2.png',
    ],
    imageCaptions: ['Điều khiển từ phía sau', 'Giật dây tâm lý đám đông'],
    image: '/src/assets/images/level_6/image_1.png',
    answer: 'THAO TÚNG TRUYỀN THÔNG',
    aliases: ['THAO TUC TRUYEN THONG', 'MEDIA MANIPULATION'],
    definition: 'Thao túng truyền thông là hành động cố ý tạo ra và phát tán thông tin sai lệch hoặc phiến diện nhằm điều khiển nhận thức và hành động của đám đông. Đây là nguyên nhân chính dẫn đến việc con người tiếp nhận thông tin thụ động và bị chi phối bởi tâm lý đám đông.',
    application: 'Nhận biết các dấu hiệu thao túng: clickbait, chỉnh sửa hình ảnh, đơn lẻ hóa sự thật phức tạp, lợi dụng cảm xúc. Khi phát hiện, hãy dừng lại, tìm kiếm thông tin từ nhiều nguồn độc lập, và đặt câu hỏi về ý đồ của người phát tán.',
    hint: 'Đây là hành động cố ý điều khiển thông tin để khiến người khác tin và làm theo ý mình – một trong những nguy cơ lớn nhất của thời đại mạng xã hội.',
  },
  {
    id: 7,
    images: [
      '/src/assets/images/level_7/image_1.png',
      '/src/assets/images/level_7/image_2.png',
    ],
    imageCaptions: ['Chủ động đặt câu hỏi', 'Phân tích và đánh giá thông tin'],
    image: '/src/assets/images/level_7/image_1.png',
    answer: 'TƯ DUY PHẢN BIỆN',
    aliases: ['TU DUY PHAN BIEN', 'CRITICAL THINKING'],
    definition: 'Thay vì thụ động chờ đợi thông tin tìm đến, hãy chủ động tìm kiếm nguồn tin cậy và đặt câu hỏi: thông tin này có chính xác không? Ai hưởng lợi nếu mình tin vào điều này? Có bằng chứng phản bác không?',
    application: 'Rèn luyện tư duy phản biện không phải một lần là xong – đó là quá trình liên tục theo nguyên lý phát triển. Học cách dùng công cụ AI để kiểm chứng thông tin, đọc nhiều góc nhìn khác nhau trước khi kết luận.',
    hint: 'Kỹ năng chủ động đặt câu hỏi, phân tích và đánh giá thông tin thay vì tiếp nhận thụ động. Đây là kỹ năng sinh viên cần rèn luyện để thích ứng với thị trường lao động 4.0.',
  },
  {
    id: 8,
    images: [
      '/src/assets/images/level_8/image_1.png',
      '/src/assets/images/level_8/image_2.png',
    ],
    imageCaptions: ['Lọc thông tin nhiều lớp', 'Phân biệt thông tin chính xác'],
    image: '/src/assets/images/level_8/image_1.png',
    answer: 'MÀNG LỌC THÔNG TIN',
    aliases: ['MANG LOC THONG TIN', 'INFORMATION FILTER'],
    definition: 'Màng lọc thông tin là hệ thống tư duy chủ động mà mỗi sinh viên cần tự xây dựng: kiểm tra ít nhất 2–3 nguồn tin khác nhau, phân biệt rõ mối liên hệ bản chất (thông tin chính thống, có cơ sở) và mối liên hệ không bản chất (tin đồn, cảm xúc cá nhân).',
    application: 'Tìm ra mối liên hệ bản chất chính là tìm ra sự thật khách quan đằng sau những hiện tượng gây sốc trên mạng xã hội. Thay vì thụ động chờ thông tin tìm đến, hãy chủ động lọc và kiểm chứng – đó là kỹ năng sống còn trong thời đại số.',
    hint: 'Công cụ tư duy giúp phân biệt thông tin bản chất (có cơ sở) với tin đồn cảm xúc (không bản chất) trước khi tin và chia sẻ.',
  },
];


