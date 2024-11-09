import { Provider } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

export const userServiceProvider: Provider = {
  provide: "USER_SERVICE",
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: 8003,
      },
    });
  },
};
