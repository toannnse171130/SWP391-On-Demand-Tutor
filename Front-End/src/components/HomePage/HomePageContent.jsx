import React from "react";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import HeartIcon from "../icons/HeartIcon";
import StarIcon from "../icons/StarIcon";
import PrimaryBtn from "../common/PrimaryBtn";
import PrimaryInput from "../common/PrimaryInput";
import LinkCustom from "../common/LinkCustom";
import { PRIVATE_ROUTER, PUBLIC_ROUTER } from "src/constants/RouterConstant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faClipboard,
  faGem,
  faMessage,
  faClock,
  faHeart,
  faFaceSmile,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBook,
  faGraduationCap,
  faPlus,
  faQuestionCircle,
  faQuoteRight,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LIST_ITEM_SEPARATE_PAGE_1 = [
  {
    id: 1,
    logo: "	https://www.daykemtainha.vn/public/templates/public/giasu/images/icons/graduate.png",
    title: "Đội ngũ gia sư",
    description: "chất lượng cao",
  },
  {
    id: 2,
    logo: "https://www.daykemtainha.vn/public/templates/public/giasu/images/icons/book.png",
    title: "Tìm gia sư",
    description: "toàn quốc",
  },
  {
    id: 3,
    logo: "https://www.daykemtainha.vn/public/templates/public/giasu/images/icons/online.png",
    title: "Hỗ trợ nhiệt tình",
    description: "24/7",
  },
];

const LIST_ITEM_SEPARATE_PAGE_2 = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faBook} size="2x" color="#43B14B" />,
    number: "754",
    description: "LỚP MỚI MỖI NGÀY",
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faFaceSmile} size="2x" color="#43B14B" />,
    number: "3000",
    description: "GIA SƯ",
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faUserGroup} size="2x" color="#43B14B" />,
    number: "754",
    description: "NHẬN LỚP THÀNH CÔNG",
  },
  {
    id: 4,
    icon: <FontAwesomeIcon icon={faGraduationCap} size="2x" color="#43B14B" />,
    number: "1248",
    description: "PHỤ HUYNH HÀI LÒNG",
  },
];

const LIST_ITEM_PAGE_2 = [
  {
    id: 1,
    title: "Chất lượng",
    description:
      "Đội ngũ giáo viên được chọn lọc kỹ, có chuyên môn cao, vui vẻ, và tâm huyết với nghề.",
    icon: <FontAwesomeIcon icon={faThumbsUp} size="3x" color="#43B14B" />,
  },
  {
    id: 2,
    title: "Uy tín",
    description:
      "Chúng tôi đã hoạt động hơn 10 năm trong lĩnh vực gia sư, nên rất hiểu rõ tâm lý phụ huynh và học viên.",
    icon: <FontAwesomeIcon icon={faGem} size="3x" color="#43B14B" />,
  },
  {
    id: 3,
    title: "Chương trình học",
    description:
      "Chúng tôi luôn đổi mới chương trình sao cho phù hợp với cải cách của bộ giáo dục & đào tạo",
    icon: <FontAwesomeIcon icon={faClipboard} size="3x" color="#43B14B" />,
  },
  {
    id: 4,
    title: "Cách dạy và học",
    description:
      "Chúng tôi luôn đổi mới, mềm dẽo trong cách dạy, làm cho học viên dễ tiếp thu, từ đó tiến bộ nhanh chóng.",
    icon: <FontAwesomeIcon icon={faMessage} size="3x" color="#43B14B" />,
  },
  {
    id: 5,
    title: "Sự hài lòng",
    description:
      "Sự hài lòng của phụ huynh và tiến bộ của học viên là phương châm hoạt động của chúng tôi.",
    icon: <FontAwesomeIcon icon={faHeart} size="3x" color="#43B14B" />,
  },
  {
    id: 6,
    title: "Kết nối nhanh chóng",
    description:
      "Bạn chỉ cần 2 phút để đăng tìm GIA SƯ, chúng tôi sẽ liên hệ ngay khi tìm thấy gia sư phù hợp với bạn.",
    icon: <FontAwesomeIcon icon={faClock} size="3x" color="#43B14B" />,
  },
];

function HomePageContent() {
  return (
    <div>
      {/* Page 1 */}
      <div
        style={{
          backgroundImage:
            "url(https://www.daykemtainha.vn/public/templates/public/giasu/images/bg/bg1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <div className="overlay"></div>
        <PageContentWrapper className="content">
          <div className="flex flex-col items-center justify-center py-40 text-center text-white">
            <div className="text-xl">
              Đội ngũ gia sư Tài Năng Trẻ có hơn 30,000 giáo viên và sinh viên
              giỏi,
              <br />
              chuyên môn hóa từng bộ môn nhận dạy kèm tại nhà trên cả nước.
            </div>
            <div className="mt-6 text-6xl font-semibold">
              HÃY <span className="text-primary">TÌM GIA SƯ GIỎI</span> NGAY!
            </div>

            <div className="mt-4 text-lg text-yellow">
              Hoặc gọi ngay:{" "}
              <span className="text-2xl text-white">0365062443</span> thầy Duy
              Tay To
            </div>
            <div className="mt-6">
              <LinkCustom to="/dang-ky">
                <PrimaryBtn className="px-8 bg-[#f0ad4e] border-[#f0ad4e] hover:bg-[#a98149]">
                  Tham gia vào đội ngũ Gia Sư !!!
                </PrimaryBtn>
              </LinkCustom>
            </div>
          </div>
        </PageContentWrapper>
      </div>
      {/* Separate Page 1 and 2  */}
      <div className="bg-[#F7F8FC]">
        <div className="mx-auto max-w-[1168px] 2xl:max-w-[1468px] grid grid-cols-3 items-center py-10">
          {LIST_ITEM_SEPARATE_PAGE_1.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center gap-8"
            >
              <img
                src={item.logo}
                alt="brand-img"
                className="object-contain w-[65px] aspect-square"
              />
              <div className="text-2xl font-medium max-w-[170px]">
                {item.title}{" "}
                <span className="text-primary">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Page 2 */}
      <div
        style={{
          backgroundImage:
            "url(https://www.daykemtainha.vn/public/templates/public/giasu/images/bg/bg1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <div className="overlay-2"></div>
        <PageContentWrapper className="content !py-0 grid grid-cols-1 gap-5 md:grid-cols-46 !pb-10">
          <img
            className="object-contain w-full"
            src="https://www.daykemtainha.vn/public/templates/public/giasu/images/bannergstnt.webp"
            alt=""
          />
          <div className="flex flex-col justify-center gap-10">
            <div className="text-3xl text-white">
              Tại sao bạn <span className="text-primary">Chọn chúng tôi</span>?
            </div>
            <div className="grid items-start grid-cols-2 gap-x-7 gap-y-10">
              {LIST_ITEM_PAGE_2.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  {item.icon}
                  <div>
                    <div className="text-lg font-medium text-white">
                      {item.title}
                    </div>
                    <div className="text-base font-light text-grayDark">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContentWrapper>
      </div>
      {/* Page 3 */}

      {/* separate page 3 and 4 */}
      <div
        style={{
          backgroundImage:
            "url(https://www.daykemtainha.vn/public/templates/public/giasu/images/bg/bg1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <div className="overlay-2"></div>
        <PageContentWrapper className="grid grid-cols-2 gap-5 md:grid-cols-4 content">
          {LIST_ITEM_SEPARATE_PAGE_2.map((item) => (
            <div className="flex flex-col items-start gap-3" key={item.id}>
              {item.icon}
              <div className="text-4xl font-normal text-white">
                {item.number}
              </div>
              <div className="text-sm font-light text-white">
                {item.description}
              </div>
            </div>
          ))}
        </PageContentWrapper>
      </div>

      {/* Page 4  */}

      {/* Page 5 */}
      <div
        style={{
          backgroundImage:
            "url(https://www.daykemtainha.vn/public/templates/public/giasu/images/bg/bg-pattern.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      ></div>
    </div>
  );
}

export default HomePageContent;

function PageContentWrapper({ className = "", ...props }) {
  return (
    <div
      className={`w-full px-0 py-10 mx-auto max-w-[1168px] 2xl:max-w-[1468px] md:py-20 ${className}`}
      {...props}
    >
      {props.children}
    </div>
  );
}

function FeaturedInstructorCard() {
  return (
    <div className="border border-gray-300 rounded-md">
      <div className="relative">
        <img
          src="https://amentotech.com/htmls/tuturn/images/index/qualified/img-01.jpg"
          alt=""
          className="h-[234px] aspect-video object-cover rounded-md"
        />
        <div className="absolute left-0 top-[6px] px-2 py-1 bg-red-500 text-white text-xs rounded-r-md">
          FEATURED
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2">
          <img
            src="https://amentotech.com/htmls/tuturn/images/index/professionol/img-01.jpg"
            alt=""
            className="w-[46px] h-[46px] object-cover rounded-full"
          />
          <div>
            <p className="text-base font-bold">Dwayne Garrett</p>
            <p className="text-sm font-light">Arlington, TN</p>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-5 gap-x-3 gap-y-1">
          <div className="text-left">Starting from:</div>
          <div className="text-right">$893.30/hr</div>
          <div className="text-left">Mobile:</div>
          <div className="text-right">xxx-xxxx-33</div>
          <div className="text-left">Whatsapp:</div>
          <div className="text-right">xxx-xxxx-33</div>
          <div className="text-left">Qualification:</div>
          <div className="text-right">B.Tech/B.E</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-t-gray-300">
        <div className="flex items-center gap-2 px-5 pt-2 pb-1">
          <StarIcon />
          <div className="font-bold">5.0</div>
          <div>(4,448)</div>
        </div>
        <div className="p-3 border-l cursor-pointer border-l-gray-300">
          <HeartIcon />
        </div>
      </div>
    </div>
  );
}

function TopCategoryTab() {
  return (
    <div className="p-1 border border-gray-300 rounded-md">
      <img
        src="https://amentotech.com/htmls/tuturn/images/index/categories/img-09.jpg"
        alt="category"
        className="object-cover w-full rounded-md aspect-square"
      />
      <div className="flex items-center justify-between p-3 mt-2">
        <div>
          <div className="font-bold">Islamic education</div>
          <div>4157 Listings</div>
        </div>
        <ArrowRightIcon />
      </div>
    </div>
  );
}

function ListTutorNear() {
  return (
    <div>
      <div className="text-base font-semibold">Tutors in Atlanta</div>
      <div className="flex flex-col gap-1 mt-3">
        <a href="#" className="flex items-center gap-2">
          <p>•</p>
          <p>B.Tech IT</p>
        </a>
        <a href="#" className="flex items-center gap-2">
          <p>•</p>
          <p>B.Tech IT</p>
        </a>
      </div>
      <div className="mt-3">
        <a href="#" className="font-medium text-blue-500">
          Explore all
        </a>
      </div>
    </div>
  );
}

// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//     slidesToSlide: 3, // optional, default to 1.
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//     slidesToSlide: 2, // optional, default to 1.
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     slidesToSlide: 1, // optional, default to 1.
//   },
// };
