package com.worklog.backend.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.worklog.backend.model.Obra;
import com.worklog.backend.repository.ObraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;

@Service
@Transactional
public class QrCodeService {
    @Autowired
    private ObraRepository obraRepository;

    @Value("${servidor.frontend}")
    private String servidorFrontend;

    public byte[] generateQrCode(String text, int width, int height) throws WriterException {
        MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
        BitMatrix bitMatrix = multiFormatWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try {
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", byteArrayOutputStream);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return byteArrayOutputStream.toByteArray();
    }

    public void saveCodeQR(Obra obra, String texto) {
        try {
            byte[] qrCode = generateQrCode(texto, 200, 200);
            obra.setCodigoQR(qrCode);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Obra updateQr(Obra obra) {
        String qrCodeUrl = servidorFrontend + "/jornalQr/" + obra.getId();
        saveCodeQR(obra, qrCodeUrl);
        return obraRepository.save(obra);
    }
}
