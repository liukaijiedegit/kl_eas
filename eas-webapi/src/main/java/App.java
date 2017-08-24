import cn.kl.eas.analyse.DataAnalyse;
import cn.kl.eas.analyse.ProcessCommand;
import cn.kl.eas.analyse.RuleMap;
import cn.kl.eas.ws.MqHeartBeat;
import com.client.IceClientUtil;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"cn.kl.eas.web", "cn.kl.eas.service", "cn.kl.rabbitmq.config", "cn.kl.eas.analyse",
"cn.kl.eas.ws", "com.client"})
@EnableJpaRepositories(basePackages = "cn.kl.eas.dao")
@EntityScan(basePackages = "cn.kl.eas.entity")
public class App extends SpringBootServletInitializer{

	//发射App
	public static void main(String[] args) {

        new IceClientUtil();
		SpringApplication app = new SpringApplication(App.class);
		app.addListeners(new DataAnalyse());
		app.addListeners(new ProcessCommand());
		app.addListeners(new RuleMap());
		app.addListeners(new MqHeartBeat());
		app.run(args);


	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(App.class);
	}
}
