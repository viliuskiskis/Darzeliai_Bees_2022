package it.akademija.initializeData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import it.akademija.kindergarten.KindergartenDAO;

@Component
public class KindergartensInit {
    
    @Autowired
    KindergartenDAO kindergartenDAO;
    
  

}
