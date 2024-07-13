import React, { useState } from "react";
import TutorProfilePageDetail from "src/components/EditProfile/TutorProfilePageDetail";
import Page401 from "src/components/error/Page401";
import Layout from "src/components/layout/Layout";
import { LIST_ROLE_KEY } from "src/constants/enumConstants";
import {
    DEFAULT_IMG,
    LIST_ROLE_AVATAR,
    LIST_ROLE_VALUE,
} from "src/constants/constants";
import ProfileHeader from "src/components/common/ProfileHeader";
import PrimaryInput from "src/components/common/PrimaryInput";
import PrimaryTextArea from "src/components/common/PrimaryTextArea";

function TutorCommonDetails() {

    return (
        <div className="bg-[#ffffff] block-border">
            <ProfileHeader title="Thông tin cá nhân" />
            <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-37">
                <div className="w-full h-auto">
                    <div className="flex flex-col items-center justify-between">
                        <div>
                            <div className="mb-5 text-xl font-semibold text-center">
                                Ảnh đại diện
                            </div>
                            <div className="flex items-center justify-center rounded w-[200px] h-[200px]">
                                <img
                                    className="object-cover w-full h-full rounded"
                                    src={
                                        DEFAULT_IMG.LOGO
                                    }
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        Chức vụ: Gia sư
                    </div>
                    <div className="mt-3">Email: tutor@gmail.com</div>
                </div>
                <div className="flex flex-col gap-4">
                    <PrimaryInput
                        title={
                            <p>
                                Họ và tên <span className="text-red-500">*</span>
                            </p>
                        }
                        placeholder="Enter first name"
                        value={
                            "Nguyễn Văn A"
                        }
                        readOnly
                    />
                    <div className="grid items-center grid-cols-2 gap-4">
                        <PrimaryInput
                            title="Giới tính"
                            value={"Nam"}
                            readOnly
                        />
                        <PrimaryInput
                            title="Ngày sinh"
                            value={
                                "1/1/2000"
                            }
                            readOnly
                        />
                    </div>
                    <PrimaryInput
                        title="Số điện thoại"
                        placeholder="Enter phone number"
                        value={"0987654321"}
                        readOnly
                    />
                    <PrimaryTextArea
                        title="Mô tả"
                        rows={4}
                        placeholder="Nhập mô tả"
                        value={
                            "Mô tả"
                        }
                        readOnly
                    />
                </div>
            </div>
            <div>
                <PrimaryTextArea
                    title="Feed back"
                    rows={4}
                    placeholder="Nhập feed back cho gia sư"
                    value={
                        "Feed back"
                    }
                    readOnly
                    className="mt-5"
                />
            </div>
        </div>

    );
}

export default TutorCommonDetails;
