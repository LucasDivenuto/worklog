package com.worklog.backend.controller;

import com.worklog.backend.model.Obra;
import com.worklog.backend.service.QrCodeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QrController {

    @Autowired
    QrCodeService qrCodeService;

    @PostMapping("/updateQr")
   // @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Object>  updateQr(@Valid @RequestBody Obra obra) {
        System.out.println(obra);
        Obra newObra = qrCodeService.updateQr(obra);
        return new ResponseEntity<>(newObra, HttpStatus.OK);
    }


}
