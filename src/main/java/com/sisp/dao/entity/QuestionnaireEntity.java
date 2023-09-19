package com.sisp.dao.entity;

import  java.io.Serializable;
import  java.util.Date;
public class QuestionnaireEntity implements Serializable {
    private String id;
    private String userId;
    private String projectId;
    private String type;
    private String questionnaireName;
    private String questionnaireContent;
    private Date beginDate;
    private Date endDate;
    private String state;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userid) {
        this.userId = userid;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getQuestionnaireName() {
        return questionnaireName;
    }

    public void setQuestionnaireName(String questionnaireName) {
        this.questionnaireName = questionnaireName;
    }

    public String getQuestionnaireContent() {
        return questionnaireContent;
    }

    public void setQuestionnaireContent(String questionnaireContent) {
        this.questionnaireContent = questionnaireContent;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "QuestionnaireEntity{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", projectId='" + projectId + '\'' +
                ", type='" + type + '\'' +
                ", questionnaireName='" + questionnaireName + '\'' +
                ", questionnaireContent='" + questionnaireContent + '\'' +
                ", beginDate=" + beginDate +
                ", endDate=" + endDate +
                ", state='" + state + '\'' +
                '}';
    }
}
