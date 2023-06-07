package com.sisp.service;

import com.sisp.common.utils.UUIDUtil;
import com.sisp.dao.QuestionnaireMapper;
import com.sisp.dao.entity.QuestionnaireEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionnaireService {
    @Autowired
    private QuestionnaireMapper questionnaireMapper;
    public int addQuestionnaInfo(QuestionnaireEntity questionnaireEntity){
        questionnaireEntity.setQuestionId(UUIDUtil.getOneUUID());
        int result = questionnaireMapper.inserQulist(questionnaireEntity);
        return result;
    }
}
