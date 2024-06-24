﻿using AutoMapper;
using Microsoft.Extensions.Hosting;
using ODT_System.DTO;
using ODT_System.Models;
using System;

namespace ODT_System.Mapper
{
    public class ModelToDTO : Profile
    {
        public ModelToDTO()
        {
            CreateMap<User, UserLoginDTO>();
            CreateMap<User, UserRegisterDTO>();
            CreateMap<User, ViewProfileDTO>();
            CreateMap<StudyTime, StudyTimeDTO>();
            CreateMap<Post, PostCreateDTO>();
            CreateMap<Post, PostTutorDTO>();
            CreateMap<Post, PostCommonDTO>();
            CreateMap<User, UserCommonDTO>();
            CreateMap<Post, PostAdminDTO>();
            CreateMap<User, UserAdminDTO>();
            CreateMap<Chat, ChatDTO>();
            CreateMap<User, UserChatDTO>();
        }
    }
}
