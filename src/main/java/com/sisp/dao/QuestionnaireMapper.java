package com.sisp.dao;

import com.sisp.dao.entity.QuestionnaireEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface QuestionnaireMapper {
    //添加问卷
    int insertQuestionnaire(QuestionnaireEntity questionnaireEntity);
    //查询一个项目下的问卷
    List<QuestionnaireEntity> selectQuestionnaireByProjectId(QuestionnaireEntity questionnaireEntity);

}
