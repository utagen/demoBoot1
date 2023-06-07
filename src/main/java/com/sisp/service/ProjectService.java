package com.sisp.service;

import com.sisp.common.utils.UUIDUtil;
import com.sisp.common.utils.DateUtil;
import com.sisp.dao.entity.ProjectEntity;
import com.sisp.dao.entity.UserEntity;
import com.sisp.dao.ProjectEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class ProjectService {
    @Autowired
    private ProjectEntityMapper projectEntityMapper;

    public List<ProjectEntity> queryProjectList(ProjectEntity projectEntity) {
        if ("".equals(projectEntity.getProjectName())) {
            projectEntity.setProjectName(null);
        }
        List<ProjectEntity> proResult = projectEntityMapper.queryProjectList(projectEntity);
        return new ArrayList<>(proResult);
    }

    public List<ProjectEntity> selectProjectListByNameLike(ProjectEntity projectEntity) {
        List<ProjectEntity> result = projectEntityMapper.selectProjectListByNameLike(projectEntity);
        return new ArrayList<>(result);
    }

    public ProjectEntity selectProjectInfoById(ProjectEntity projectEntity) {
        ProjectEntity result = projectEntityMapper.selectProjectInfoById(projectEntity);
        return result;
    }


    public int addProjectInfo(ProjectEntity projectEntity, String user) {
        String id = UUIDUtil.getOneUUID();
        projectEntity.setId(id);
        //获取当前时间，并设置成creationDate
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(formatter.format(date));
        projectEntity.setCreationDate(date);
        projectEntity.setLastUpdateDate(date);
        int ProjectResult = projectEntityMapper.insert(projectEntity);
        return ProjectResult;
    }

    public int modifyProjectInfo(ProjectEntity projectEntity, String user) {
        //获取当前时间，并设置成lastUpdateDate
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(formatter.format(date));
        projectEntity.setLastUpdateDate(date);
        int ProjectResult = projectEntityMapper.updateByPrimaryKeySelective(projectEntity);
        return ProjectResult;
    }

    public int deleteProjectById(ProjectEntity projectEntity) {
        String projectId = projectEntity.getId();
        System.out.println(projectId);
        int ProjectResult = projectEntityMapper.deleteProjectById(projectId);
        return ProjectResult;
    }

    public List<Object> queryAllProjectName() {
        List<Object> resultList = new ArrayList<Object>();
        List<Map<String, Object>> proResult = projectEntityMapper.queryAllProjectName();
        for (Map<String, Object> proObj : proResult) {
            resultList.add(proObj);
        }
        return resultList;
    }

    public String queryProjectNameById(String id) {
        String projectName = projectEntityMapper.queryProjectNameById(id);
        return projectName;
    }
}
