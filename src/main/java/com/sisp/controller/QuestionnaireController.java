package com.sisp.controller;

import com.sisp.beans.HttpResponseEntity;
import com.sisp.common.utils.UUIDUtil;
import com.sisp.dao.entity.ItemEntity;
import com.sisp.dao.entity.QuestionEntity;
import com.sisp.dao.entity.QuestionnaireEntity;
import com.sisp.service.QuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class QuestionnaireController {
    @Autowired
    private QuestionnaireService questionnaireService;

    /**
     * 创建问卷基本信息
     */
    @RequestMapping(value = "/insertQuestionnaire", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity insertQuestionnaire(@RequestBody QuestionnaireEntity questionnaireEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = questionnaireService.insertQuestionnaire(questionnaireEntity);
            if (result == 0){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("创建失败");
                httpResponseEntity.setData(result);
            }
            else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(questionnaireEntity.getId());
                httpResponseEntity.setMassage("创建成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 根据id查找问卷信息
     */
    @RequestMapping(value = "/queryQuestionnaireById", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireById(@RequestBody QuestionnaireEntity questionnaireEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            QuestionnaireEntity result = questionnaireService.queryQuestionnaireById(questionnaireEntity);
            if (result == null){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("无问卷信息");
                httpResponseEntity.setData(result);
            }
            else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("查询成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 根据项目id查找问卷信息
     */
    @RequestMapping(value = "/queryQuestionnaireByProjectId", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireByProjectId(@RequestBody QuestionnaireEntity questionnaireEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            List<QuestionnaireEntity> result = questionnaireService.queryQuestionnaireByProjectId(questionnaireEntity);
            if (CollectionUtils.isEmpty(result)){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("无问卷信息");
                httpResponseEntity.setData(result);
            }
            else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("查询成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 根据id修改问卷名称与描述
     */
    @RequestMapping(value = "/updateQuestionnaireById", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity updateQuestionnaireById(@RequestBody QuestionnaireEntity questionnaireEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = questionnaireService.updateQuestionnaireById(questionnaireEntity);
            if (result == 0){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("修改失败");
                httpResponseEntity.setData(result);
            }
            else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("修改成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 根据id添加问卷问题
     */
    @RequestMapping(value = "/insertQuestionById", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity insertQuestionById(@RequestBody QuestionEntity questionEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = questionnaireService.insertQuestionById(questionEntity);
            if (result == 0){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("添加失败");
                httpResponseEntity.setData(result);
            }
            else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(questionEntity.getId());
                httpResponseEntity.setMassage("添加成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 根据问卷id查询问卷问题
     */
    @RequestMapping(value = "/queryQuestionByQuestionnaireId", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionByQuestionnaireId(@RequestBody QuestionEntity questionEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            List<QuestionEntity> result = questionnaireService.queryQuestionByQuestionnaireId(questionEntity);
            if (CollectionUtils.isEmpty(result)){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("无问题信息");
                httpResponseEntity.setData(result);
            }
            else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("查询成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 根据问卷id删除问卷问题
     */
    @RequestMapping(value = "/deleteQuestionByQuestionnaireId", method = RequestMethod.POST, headers = "Accept=application/json")
public HttpResponseEntity deleteQuestionByQuestionnaireId(@RequestBody QuestionEntity questionEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = questionnaireService.deleteQuestionByQuestionnaireId(questionEntity);
            if (result == 0){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("删除失败");
                httpResponseEntity.setData(result);
            }
            else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("删除成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }


    /**
     * 根据id添加问卷问题选项
     */
    @RequestMapping(value = "/insertItemById", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity insertItemById(@RequestBody ItemEntity itemEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = questionnaireService.insertItemById(itemEntity);
            if (result == 0){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("添加失败");
                httpResponseEntity.setData(result);
            }
            else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(itemEntity.getId());
                httpResponseEntity.setMassage("添加成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 根据问题id查询问题选项
     */
    @RequestMapping(value = "/queryItemByQuestionId", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryItemByQuestionId(@RequestBody ItemEntity itemEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            List<ItemEntity> result = questionnaireService.queryItemByQuestionId(itemEntity);
            if (CollectionUtils.isEmpty(result)) {
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("无选项信息");
                httpResponseEntity.setData(result);
            } else {
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("查询成功");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 根据问卷id删除问卷选项
     */
    @RequestMapping(value = "/deleteItemByQuestionnaireId", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity deleteItemByQuestionnaireId(@RequestBody ItemEntity itemEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = questionnaireService.deleteItemByQuestionnaireId(itemEntity);
            if (result == 0){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("删除失败");
                httpResponseEntity.setData(result);
            }
            else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("删除成功");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 设置问卷状态
     */
    @RequestMapping(value = "/updateQuestionnaireState", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity updateQuestionnaireState(@RequestBody QuestionnaireEntity questionnaireEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = questionnaireService.updateQuestionnaireState(questionnaireEntity);
            if (result == 0) {
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("设置失败");
                httpResponseEntity.setData(result);
            } else {
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("设置成功");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 增加选项计数
     */
    @RequestMapping(value = "/updateItemCount", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity updateItemCount(@RequestBody ItemEntity itemEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = questionnaireService.updateItemCount(itemEntity);
            if (result == 0) {
                httpResponseEntity.setCode("0");
                httpResponseEntity.setMassage("设置失败");
                httpResponseEntity.setData(result);
            } else {
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMassage("设置成功");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }
}
