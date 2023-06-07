package com.sisp.service;

import com.sisp.common.utils.UUIDUtil;
import com.sisp.dao.QuestionnaireMapper;
import com.sisp.dao.entity.QuestionnaireEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionnaireService {
    @Autowired
    private QuestionnaireMapper questionnaireMapper;
    public int insertQuestionnaire(QuestionnaireEntity questionnaireEntity){
        questionnaireEntity.setId(UUIDUtil.getOneUUID());
        int result = questionnaireMapper.insertQuestionnaire(questionnaireEntity);
        return result;
    }

    public List<QuestionnaireEntity> selectQuestionnaireByProjectId(QuestionnaireEntity questionnaireEntity) {
        List<QuestionnaireEntity> result = questionnaireMapper.selectQuestionnaireByProjectId(questionnaireEntity);
        System.out.println("QNservice");
        System.out.println(result);
        return result;
    }
}
