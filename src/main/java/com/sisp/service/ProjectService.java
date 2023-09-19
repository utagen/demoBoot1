package com.sisp.service;

import com.sisp.common.utils.UUIDUtil;
import com.sisp.dao.ProjectEntityMapper;
import com.sisp.dao.entity.ProjectEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectEntityMapper projectEntityMapper;


    /**
     * 查询项目列表
     */
    public List<ProjectEntity> queryProjectList(ProjectEntity projectEntity) {
        List<ProjectEntity> result = projectEntityMapper.queryProjectList(projectEntity);
        return result;
    }

    /**
     * 创建项目基本信息
     */
    public int addProjectInfo(ProjectEntity projectEntity) {
        projectEntity.setId(UUIDUtil.getOneUUID());
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        projectEntity.setCreationDate(timestamp);
        int result = projectEntityMapper.insert(projectEntity);
        if (result != 0) {
            return 3;   //3表示项目存在
        } else {
            return result;
        }
    }

    /**
     * 根据id删除项目信息
     */
    public int deleteProjectById(ProjectEntity projectEntity) {
        int result = projectEntityMapper.deleteProjectById(projectEntity);
        return result;
    }

    /**
     * 编辑项目信息
     */
    public int modifyProjectInfo(ProjectEntity projectEntity) {
        int result = projectEntityMapper.updateByPrimaryKeySelective(projectEntity);
        return result;
    }
}
