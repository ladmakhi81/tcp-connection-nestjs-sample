import { Provider } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

export const tokenServiceProvider: Provider = {
  provide: "TOKEN_SERVICE",
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: 8002,
      },
    });
  },
};
