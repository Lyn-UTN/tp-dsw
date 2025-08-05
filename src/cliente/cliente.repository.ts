import { Repository } from "../shared/repository.js";
import { Cliente } from "./cliente.entity.js";

const clientes = [ 
    new Cliente(
        "Juan",
        "Perez",
        "DNI",
        12345678,
        "1234567890",
        "pepe@gmail",
        "password123", 
        1,
        "B12345678"
    )
];

export class ClienteRepository implements Repository<Cliente>{

    public findAll(): Cliente[] | undefined {
        return clientes;
    }
    public findOne(item: { id: string }): Cliente | undefined {
        return clientes.find(cliente => cliente.idCliente.toString() === item.id);
    }

    public add(item: Cliente): Cliente | undefined {
        clientes.push(item) 
        return item;
    }

    public update(item: Cliente): Cliente | undefined {
        const index = clientes.findIndex(cliente => cliente.idCliente === item.idCliente);
        if (index !== -1) {
        clientes[index] = { ...clientes[index], ...item };

        }
        return clientes[index];
    }

    public delete(item: { id: string }): Cliente | undefined {
        
        const clienteIdx = clientes.findIndex((cliente) => cliente.idCliente.toString()=== item.id);


        if (clienteIdx !== -1) {
            const deletedCliente = clientes[clienteIdx];
            clientes.splice(clienteIdx, 1);
            return deletedCliente;
    }
  }
}