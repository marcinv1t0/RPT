package com.mbgarage.rpt.cucumber.stepdefs;

import com.mbgarage.rpt.RptApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = RptApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
