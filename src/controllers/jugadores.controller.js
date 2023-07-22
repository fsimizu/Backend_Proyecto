import { jugadoresService } from '../services/jugadores.service.js';

class JugadoresController {
  getAll = (req, res) => {
    const jugadoresEncontrados = jugadoresService.getAll();
    return res.json(jugadoresEncontrados);
  };

  createOne = (req, res) => {
    //1 saca los datos del request
    const jugador = req.body;
    //2 pasa al servicio para que trabaje por el
    const jugadorCreado = jugadoresService.createOne(jugador);
    //3 da la respuesta
    return res.json(jugadorCreado);
  };

  editOne = (req, res) => {
    const { id } = req.params;
    const { name, goles, importantes } = req.body;
    const jugadorModificado = jugadoresService.editOne(id, name, goles, importantes);
    return res.json(jugadorModificado);
  };

  deleteOne = (req, res) => {
    const { id } = req.params;
    let jugadorEliminado = jugadoresService.deleteOne(id);
    return res.json(jugadorEliminado);
  };

}

export const jugadoresController = new JugadoresController();