package com.sisp.dao;

import  com.sisp.dao.entity.ProjectEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper
public interface ProjectEntityMapper {
    /**
     * 查询项目列表
     */
    List<ProjectEntity> queryProjectList(ProjectEntity projectEntity);

    /**
     * 创建项目基本信息
     */
    int insert(ProjectEntity projectEntity);

    /**
     * 根据id删除项目信息
     */
    int deleteProjectById(ProjectEntity projectEntity);

    /**
     * 编辑项目信息
     */
    int updateByPrimaryKeySelective(ProjectEntity projectEntity);
}
