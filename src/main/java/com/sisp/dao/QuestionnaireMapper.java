package com.sisp.dao;

import com.sisp.dao.entity.QuestionnaireEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface QuestionnaireMapper {
    int inserQulist(QuestionnaireEntity questionnaireEntity);
}
