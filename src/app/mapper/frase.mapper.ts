import { FraseDTO, FraseRegistroDTO } from '../dto/frase.dto';
import { Frase } from '../model/frase';

export class FraseMapper {
  static toDTO(frase: Frase): FraseDTO {
    const dto = new FraseDTO();
    dto.id = frase.id;
    dto.autor = frase.autor;
    dto.texto = frase.texto;
    return dto;
  }

  static toDTOList(frases: Frase[]): FraseDTO[] {
    return frases.map((frase) => FraseMapper.toDTO(frase));
  }

  static fromDTO(dto: FraseDTO): Frase {
    return {
      id: dto.id!,
      autor: dto.autor,
      texto: dto.texto,
    };
  }

  static fromRegistroDTO(dto: FraseRegistroDTO, id: number): Frase {
    return {
      id,
      autor: dto.autor,
      texto: dto.texto,
    };
  }
}
