package com.sisp.dao;
import com.sisp.dao.entity.ProjectEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
@Component
@Mapper

public interface ProjectEntityMapper {
    //查询全部项目列表
    List<ProjectEntity> queryProjectList(ProjectEntity projectEntity);
    //根据项目名称查询(like模糊查询)
    List<ProjectEntity> selectProjectListByNameLike(ProjectEntity projectEntity);
    //根据id查询项目信息
    ProjectEntity selectProjectInfoById(ProjectEntity projectEntity);

    List<Map<String,Object>> queryAllProjectName();
    String queryProjectNameById(String id);
    int insertSelective(ProjectEntity projectEntity);
    int insert(ProjectEntity projectEntity);
    int updateByPrimaryKeySelective(ProjectEntity projectEntity);
    int deleteProjectById(String id);
}
