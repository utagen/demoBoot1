package com.sisp.dao;

import com.sisp.dao.entity.ItemEntity;
import com.sisp.dao.entity.QuestionEntity;
import com.sisp.dao.entity.QuestionnaireEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper
public interface QuestionnaireEntityMapper {
    /**
     * 创建问卷基本信息
     */
    int insertQuestionnaire(QuestionnaireEntity questionnaireEntity);

    /**
     * 根据id查找问卷信息
     */
    QuestionnaireEntity queryQuestionnaireById(QuestionnaireEntity questionnaireEntity);

    /**
     * 根据项目id查找问卷信息
     */
    List<QuestionnaireEntity> queryQuestionnaireByProjectId(QuestionnaireEntity questionnaireEntity);

    /**
     * 根据id修改问卷名称与描述
     */
    int updateQuestionnaireById(QuestionnaireEntity questionnaireEntity);

    /**
     * 根据id添加问卷问题
     */
    int insertQuestionById(QuestionEntity questionEntity);

    /**
     * 根据问卷id查询问卷问题
     */
    List<QuestionEntity> queryQuestionByQuestionnaireId(QuestionEntity questionEntity);

    /**
     * 根据问卷id删除问卷问题
     */
    int deleteQuestionByQuestionnaireId(QuestionEntity questionEntity);

    /**
     * 根据id添加问卷问题选项
     */
    int insertItemById(ItemEntity itemEntity);

    /**
     * 根据问题id查询问卷问题选项
     */
    List<ItemEntity> queryItemByQuestionId(ItemEntity itemEntity);

    /**
     * 根据问卷id删除问卷选项
     */
    int deleteItemByQuestionnaireId(ItemEntity itemEntity);

    /**
     * 设置问卷状态
     */
    int updateQuestionnaireState(QuestionnaireEntity questionnaireEntity);

    /**
     * 增加选项计数
     */
    int updateItemCount(ItemEntity itemEntity);
}
