package com.sisp.controller;

import com.sisp.beans.HttpResponseEntity;
import com.sisp.common.Constans;
import com.sisp.dao.entity.ProjectEntity;
import com.sisp.dao.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import com.sisp.dao.ProjectEntityMapper;
import com.sisp.service.ProjectService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
public class Projectcontroller {
    private final Logger logger = LoggerFactory.getLogger(Projectcontroller.class);
    @Autowired
    private ProjectService projectService;
    @RequestMapping(value = "/queryProjectList",method = RequestMethod.POST,headers = "Accept=application/json")
    public HttpResponseEntity queryProjectList(@RequestBody(required = false) ProjectEntity projectEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            List<ProjectEntity> hasUser = projectService.queryProjectList(projectEntity);
            if (CollectionUtils.isEmpty(hasUser)){
                httpResponseEntity.setCode("0");
                if (hasUser != null && hasUser.size() > 0) {
                    httpResponseEntity.setData(hasUser.get(0));
                }
                httpResponseEntity.setMassage("无用户信息");
            }else {
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
                httpResponseEntity.setData(hasUser);
                httpResponseEntity.setMassage("查询成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    @RequestMapping(value = "/selectProjectListByNameLike",method = RequestMethod.POST,headers = "Accept=application/json")
    public HttpResponseEntity selectProjectListByNameLike(@RequestBody ProjectEntity projectEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            List<ProjectEntity> hasUser = projectService.selectProjectListByNameLike(projectEntity);
            if (CollectionUtils.isEmpty(hasUser)){
                httpResponseEntity.setCode("0");
                if (hasUser != null && hasUser.size() > 0) {
                    httpResponseEntity.setData(hasUser.get(0));
                }
                httpResponseEntity.setMassage("无用户信息");
            }else {
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
                httpResponseEntity.setData(hasUser);
                httpResponseEntity.setMassage("查询成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    @RequestMapping(value = "/selectProjectInfoById",method = RequestMethod.POST,headers = "Accept=application/json")
    public HttpResponseEntity selectProjectInfoById(@RequestBody ProjectEntity projectEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            ProjectEntity hasUser = projectService.selectProjectInfoById(projectEntity);
            if (hasUser == null){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("无用户信息");
            }else {
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
                httpResponseEntity.setData(hasUser);
                httpResponseEntity.setMassage("查询成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }



    @RequestMapping(value = "/addProjectInfo",method = RequestMethod.POST,headers = "Accept=application/json")
    public HttpResponseEntity addProjectInfo(@RequestBody ProjectEntity projectEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = projectService.addProjectInfo(projectEntity,projectEntity.getCreatedBy());
            System.out.println(projectEntity.toString());
            System.out.println(result);
            if (result ==3){
                httpResponseEntity.setCode(Constans.EXIST_CODE);
                httpResponseEntity.setMassage(Constans.EXIST_MESSAGE);
            }else {
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
                httpResponseEntity.setMassage(Constans.ADD_MESSAGE);
            }
        }catch (Exception e){
            logger.info("addProjectInfo 创建项目" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
            httpResponseEntity.setMassage(Constans.EXIST_MESSAGE);
        }
        return httpResponseEntity;
    }
    @RequestMapping(value = "/modifyProjectInfo",method = RequestMethod.POST,headers = "Accept=application/json")
    public HttpResponseEntity modifyProjectInfo(@RequestBody ProjectEntity projectEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = projectService.modifyProjectInfo(projectEntity,projectEntity.getCreatedBy());
            if(result == 3) {
                httpResponseEntity.setCode(Constans.EXIST_CODE);
                httpResponseEntity.setMassage(Constans.EXIST_MESSAGE);
            }else {
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
                httpResponseEntity.setMassage(Constans.ADD_MESSAGE);
            }
        } catch (Exception e) {
            logger.info("modifyProjectInfo 修改项目的基本信息>>>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
            httpResponseEntity.setMassage(Constans.EXIST_MESSAGE);
        }
        return httpResponseEntity;
    }
    @RequestMapping(value = "/deleteProjectById",method = RequestMethod.POST,headers = "Accept=application/json")
    public HttpResponseEntity deleteProjectById(@RequestBody ProjectEntity projectEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = projectService.deleteProjectById(projectEntity);
            if (result!=0){
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("删除成功");
            }else {
                httpResponseEntity.setCode("0");
                httpResponseEntity.setData(0);
                httpResponseEntity.setMassage("删除失败");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }
    @RequestMapping(value = "/queryAllProjectName",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryAllProjectName() {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        List<Object> result = projectService.queryAllProjectName();
        httpResponseEntity.setCode(Constans.SUCCESS_CODE);
        httpResponseEntity.setData(result);
        return httpResponseEntity;
    }
}
