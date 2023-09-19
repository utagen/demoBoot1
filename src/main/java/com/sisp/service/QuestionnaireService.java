package com.sisp.service;

import com.sisp.common.utils.UUIDUtil;
import com.sisp.dao.QuestionnaireEntityMapper;
import com.sisp.dao.entity.ItemEntity;
import com.sisp.dao.entity.QuestionEntity;
import com.sisp.dao.entity.QuestionnaireEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionnaireService {
    @Autowired
    private QuestionnaireEntityMapper questionnaireEntityMapper;

    /**
     * 创建问卷基本信息
     */
    public int insertQuestionnaire(QuestionnaireEntity questionnaireEntity) {
        questionnaireEntity.setId(UUIDUtil.getOneUUID());
        questionnaireEntity.setState("close");
        int result = questionnaireEntityMapper.insertQuestionnaire(questionnaireEntity);
        if (result != 0) {
            return 3;   //3表示问卷存在
        } else {
            return result;
        }
    }

    /**
     * 根据id查找问卷信息
     */
    public QuestionnaireEntity queryQuestionnaireById(QuestionnaireEntity questionnaireEntity) {
        QuestionnaireEntity result = questionnaireEntityMapper.queryQuestionnaireById(questionnaireEntity);
        return result;
    }

    /**
     * 根据项目id查找问卷信息
     */
    public List<QuestionnaireEntity> queryQuestionnaireByProjectId(QuestionnaireEntity questionnaireEntity) {
        List<QuestionnaireEntity> result = questionnaireEntityMapper.queryQuestionnaireByProjectId(questionnaireEntity);
        return result;
    }

    /**
     * 根据id修改问卷名称和描述
     */
    public int updateQuestionnaireById(QuestionnaireEntity questionnaireEntity) {
        int result = questionnaireEntityMapper.updateQuestionnaireById(questionnaireEntity);
        return result;
    }

    /**
     * 根据id添加问卷问题
     */
    public int insertQuestionById(QuestionEntity questionEntity) {
        questionEntity.setId(UUIDUtil.getOneUUID());
        int result = questionnaireEntityMapper.insertQuestionById(questionEntity);
        return result;
    }

    /**
     * 根据问卷id查询问卷问题
     */
    public List<QuestionEntity> queryQuestionByQuestionnaireId(QuestionEntity questionEntity) {
        List<QuestionEntity> result = questionnaireEntityMapper.queryQuestionByQuestionnaireId(questionEntity);
        return result;
    }

    /**
     * 根据问卷id删除问卷问题
     */
    public int deleteQuestionByQuestionnaireId(QuestionEntity questionEntity) {
        int result = questionnaireEntityMapper.deleteQuestionByQuestionnaireId(questionEntity);
        return result;
    }

    /**
     * 根据id添加问卷问题选项
     */
    public int insertItemById(ItemEntity itemEntity) {
        itemEntity.setId(UUIDUtil.getOneUUID());
        int result = questionnaireEntityMapper.insertItemById(itemEntity);
        return result;
    }

    /**
     * 根据问题id查询问卷问题选项
     */
    public List<ItemEntity> queryItemByQuestionId(ItemEntity itemEntity) {
        List<ItemEntity> result = questionnaireEntityMapper.queryItemByQuestionId(itemEntity);
        return result;
    }

    /**
     * 根据问卷id删除问卷选项
     */
    public int deleteItemByQuestionnaireId(ItemEntity itemEntity) {
        int result = questionnaireEntityMapper.deleteItemByQuestionnaireId(itemEntity);
        return result;
    }

    /**
     * 设置问卷状态
     */
    public int updateQuestionnaireState(QuestionnaireEntity questionnaireEntity) {
        int result = questionnaireEntityMapper.updateQuestionnaireState(questionnaireEntity);
        return result;
    }

    /**
     * 增加选项计数
     */
    public int updateItemCount(ItemEntity itemEntity) {
        int result = questionnaireEntityMapper.updateItemCount(itemEntity);
        return result;
    }
}
