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
import { DatePipe } from '@angular/common';

export class PetCard {
  constructor(public datePipe: DatePipe) {}
  private getVacinationTable(v: Vacination[] = []): Table {
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
    const bodyRows = (v || []).filter(Boolean).map((vac, i) => {
      return new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: String(i + 1), alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            children: [new Paragraph(this.date(vac?.date) || '')],
          }),
          new TableCell({
            children: [new Paragraph(vac.vacineName || '')],
          }),
          new TableCell({
            children: [new Paragraph(vac.serialNumber || '')],
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
  private getParisitesTable(v: ParasiteMedicineTreatment[] = []): Table {
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
    const bodyRows = (v || []).filter(Boolean).map((vac, i) => {
      return new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: String(i + 1), alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            children: [new Paragraph(this.date(vac?.date) || '')],
          }),
          new TableCell({
            children: [new Paragraph(vac.medicineName || '')],
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
  private getHealthTable(v: HealthStatus[] = []): Table {
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
    const bodyRows = (v || []).filter(Boolean).map((health, i) => {
      return new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: String(i + 1), alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            children: [new Paragraph(this.date(health?.date) || '')],
          }),
          new TableCell({
            children: [new Paragraph(String(health?.weight?.toString() || ''))],
          }),
          new TableCell({
            children: [new Paragraph(health?.anamnesis || '')],
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

  printCard(pet: Partial<Pet>) {
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

    const uglyDate = (d) => {
      if (typeof d === 'string' && !d.match('\d')) {
        return d;
      }
      const date = this.datePipe.transform(d, 'dd.LLLL.yyyy');
      if(date) {
        const [day, month, year] = date.split('.');
        return `«${day}»${month}${year} год`;
      }
      return '';
    };
    doc.addSection({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'КАРТОЧКА УЧЕТА ЖИВОТНОГО № ', bold: true }),
            new TextRun({ text: pet.cardNumber || '   ', bold: true, underline: {} }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          text: 'г. Москва' + `${uglyDate(new Date())}`,
        }),
        new Paragraph({
          text: `Приют для животных по адресу: ${pet.shelter?.address || ''}`,
        }),
        new Paragraph({
          text: `Эксплуатирующая организация: ${pet.shelter?.organisation?.name || ''}`,
        }),
        new Paragraph({
          text: `Номер вольера: ${pet.place || ''}`,
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          text: 'Основные сведения:',
        }),
        new Paragraph({
          text: `Собака: [${pet.kind === 'dog' ? 'х' : ''}]`,
        }),
        new Paragraph({
          text: `Кошка: [${pet.kind === 'cat' ? 'х' : ''}]`,
        }),
        new Paragraph({
          text: `Возраст: ${pet.age || ''}`,
        }),
        new Paragraph({
          text: `Вес: ${pet.weight || ''}`,
        }),

        new Paragraph({
          text: `Кличка: ${pet.name || 'без клички'}`,
        }),
        new Paragraph({
          text: `Пол: ${pet.sex === 'male' ? 'Мужской' : 'Женский'}`,
        }),
        new Paragraph({
          text: `Порода: ${pet.breed?.value || ''}`,
        }),
        new Paragraph({
          text: `Окрас: ${pet.color?.value || ''}`,
        }),
        new Paragraph({
          text: `Шерсть: ${pet.wool?.value || ''}`,
        }),
        new Paragraph({
          text: `Уши: ${pet.ears?.value || ''}`,
        }),
        new Paragraph({
          text: `Хвост: ${pet.tail?.value || ''}`,
        }),
        new Paragraph({
          text: `Идентификационная метка: ${pet.labelId || ''}`,
        }),
        new Paragraph({
          text: `Дата стерилизации ${uglyDate(pet.sterilizationAt)}`,
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
  private date(date: string | Date, format: string = 'dd.MM.yyyy'): string {
    return this.datePipe.transform(date, format);
  }
}
