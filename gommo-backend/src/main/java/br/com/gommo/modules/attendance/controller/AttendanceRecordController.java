package br.com.gommo.modules.attendance.controller;
import br.com.gommo.core.base.controller.BaseController;
import br.com.gommo.modules.attendance.dto.AttendanceRecordRequestDto;
import br.com.gommo.modules.attendance.dto.AttendanceRecordResponseDto;
import br.com.gommo.modules.attendance.service.IAttendanceRecordService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController @RequestMapping("/api/v1/attendance-records")
public class AttendanceRecordController extends BaseController<AttendanceRecordRequestDto, AttendanceRecordResponseDto> {
    public AttendanceRecordController(IAttendanceRecordService service) { super(service); }
}
