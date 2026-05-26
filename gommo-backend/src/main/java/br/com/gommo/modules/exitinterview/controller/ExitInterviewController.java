package br.com.gommo.modules.exitinterview.controller;
import br.com.gommo.core.base.controller.BaseController;
import br.com.gommo.modules.exitinterview.dto.ExitInterviewRequestDto;
import br.com.gommo.modules.exitinterview.dto.ExitInterviewResponseDto;
import br.com.gommo.modules.exitinterview.service.IExitInterviewService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController @RequestMapping("/api/v1/exit-interviews")
public class ExitInterviewController extends BaseController<ExitInterviewRequestDto, ExitInterviewResponseDto> {
    public ExitInterviewController(IExitInterviewService service) { super(service); }
}
