import {
  Document,
  Packer,
  Paragraph,
  AlignmentType,
  HeadingLevel,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from 'docx';
import { HealthStatus, ParasiteMedicineTreatment, Pet, Vacination } from '@pet-hackaton/types';
// import * as fs from 'fs';

export class PetCard {
  private getVacinationTable(v: Vacination[]): Table {
    const headRow = new TableRow({
      children: [
        new TableCell({
          width: {
            size: '5%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: '№п/п', alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: {
            size: '15%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: 'Дата', alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: {
            size: '15%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: 'Вид вакцины', alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: {
            size: '15%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: '№ серии', alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: {
            size: '15%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: 'Подпись ветеринарного врача и печать', alignment: AlignmentType.CENTER })],
        }),
      ],
    });
    const bodyRows = (v || []).map((vac, i) => {
      return new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: String(i + 1), alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            children: [new Paragraph(vac.date.toISOString())],
          }),
          new TableCell({
            children: [new Paragraph(vac.vacineName)],
          }),
          new TableCell({
            children: [new Paragraph(vac.serialNumber)],
          }),
          new TableCell({
            children: [],
          }),
        ],
      });
    });
    return new Table({
      rows: [headRow, ...bodyRows],
    });
  }
  private getParisitesTable(v: ParasiteMedicineTreatment[]): Table {
    const headRow = new TableRow({
      children: [
        new TableCell({
          width: {
            size: '5%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: '№п/п', alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: {
            size: '15%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: 'Дата', alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: {
            size: '15%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: 'Препарат', alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: {
            size: '15%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: 'Доза', alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: {
            size: '15%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: 'Подпись ветеринарного врача и печать', alignment: AlignmentType.CENTER })],
        }),
      ],
    });
    const bodyRows = (v || []).map((vac, i) => {
      return new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: String(i + 1), alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            children: [new Paragraph((vac.date && vac.date.toISOString()) || '')],
          }),
          new TableCell({
            children: [new Paragraph(vac.medicineName)],
          }),
          new TableCell({
            children: [new Paragraph(vac.medicineDose || '')],
          }),
          new TableCell({
            children: [],
          }),
        ],
      });
    });
    return new Table({
      rows: [headRow, ...bodyRows],
    });
  }
  private getHealthTable(v: HealthStatus[]): Table {
    const headRow = new TableRow({
      children: [
        new TableCell({
          width: {
            size: '5%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: '№п/п', alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: {
            size: '15%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: 'Дата', alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: {
            size: '15%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: 'Вес', alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: {
            size: '15%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: 'Анамнез', alignment: AlignmentType.CENTER })],
        }),
        new TableCell({
          width: {
            size: '15%',
            type: WidthType.AUTO,
          },
          children: [new Paragraph({ text: 'Подпись ветеринарного врача и печать', alignment: AlignmentType.CENTER })],
        }),
      ],
    });
    const bodyRows = (v || []).map((health, i) => {
      return new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: String(i + 1), alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            children: [new Paragraph((health.date && health.date.toISOString()) || '')],
          }),
          new TableCell({
            children: [new Paragraph(String(health.weight))],
          }),
          new TableCell({
            children: [new Paragraph(health.anamnesis)],
          }),
          new TableCell({
            children: [],
          }),
        ],
      });
    });
    return new Table({
      rows: [headRow, ...bodyRows],
    });
  }

  printCard(pet: Pet) {
    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: 'Heading3',
            name: 'Heading 3',
            basedOn: 'Normal',
            next: 'Normal',
            quickFormat: true,
            run: {
              bold: true,
            },
          },
        ],
      },
    });

    const date = new Date();
    doc.addSection({
      children: [
        new Paragraph({
          // heading: HeadingLevel.HEADING_1,
          // alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'КАРТОЧКА УЧЕТА ЖИВОТНОГО № ', bold: true }),
            new TextRun({ text: pet.cardNumber, bold: true, underline: {} }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          text: 'г. Москва' + `«${date.getDay()}»${date.getMonth()}${date.getFullYear()} год`,
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          text: 'Сведения об обработке от экто- и эндопаразитов',
        }),
        this.getParisitesTable(pet.parasiteTreatments),
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          text: 'Сведения о вакцинации',
        }),
        this.getVacinationTable(pet.vacinations),
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          text: 'Сведения о состоянии здоровья',
        }),
        this.getHealthTable(pet.healthchecks),
      ],
    });

    return Packer.toBlob(doc);
  }
}
