package com.pagewatcher.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pagewatcher.model.ScreenShot;

import java.io.IOException;

public class ScreenShotMapper extends ObjectMapper {

    public static ScreenShot mapperResponse(String content) {
        System.out.println(content);
        ObjectMapper objectMapper = new ObjectMapper();
        ScreenShot screenShot = null;
        try {
            screenShot = objectMapper.readValue(content, ScreenShot.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println("Èdesde servidor externo");
        System.out.println(screenShot.getSize());
        return screenShot;
    }
}
