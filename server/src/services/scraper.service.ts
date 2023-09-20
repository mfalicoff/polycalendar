import cheerio from 'cheerio';
import { logger } from '@utils/logger';
import fetch from 'node-fetch';
import { Class, LabSection, TheorySection } from '@interfaces/class.interface';
import * as fs from 'fs';
import path from 'path';

const parseTheoryClass = elem => {
  const theorySections: TheorySection[] = [];
  const ClassHtmlTable = elem.children[1].children[1].children[3];

  for (let j = 3; j < ClassHtmlTable.children.length; j = j + 2) {
    const currentClass: TheorySection = {} as TheorySection;

    currentClass.theoryClassGroup = ClassHtmlTable.children[j].children[1].children[0].data;
    if (currentClass.theoryClassGroup.length === 1) {
      currentClass.theoryClassGroup = ClassHtmlTable.children[j - 2].children[1].children[0].data;
    }
    currentClass.theoryClassDate = ClassHtmlTable.children[j].children[3].children[0].data;
    currentClass.theoryClassTime = ClassHtmlTable.children[j].children[5].children[0].data;
    currentClass.theoryClassClassroom = ClassHtmlTable.children[j].children[7].children[0].data;

    theorySections.push(currentClass);
  }

  return theorySections;
};

const parseLabClass = elem => {
  const labSections: LabSection[] = [];
  const LabHtmlTable = elem.children[3].children[1].children[3];

  for (let j = 3; j < LabHtmlTable.children.length; j = j + 2) {
    const currentClass: LabSection = {} as LabSection;

    currentClass.labClassGroup = LabHtmlTable.children[j].children[1].children[0].data;
    if (currentClass.labClassGroup.length === 1) {
      currentClass.labClassGroup = LabHtmlTable.children[j - 2].children[1].children[0].data;
    }
    currentClass.labClassDate = LabHtmlTable.children[j].children[3].children[0].data;
    currentClass.labClassTime = LabHtmlTable.children[j].children[5].children[0].data;
    currentClass.labClassClassroom = LabHtmlTable.children[j].children[7].children[0].data;

    labSections.push(currentClass);
  }

  return labSections;
};

const parseClass = (elem, classesRepertoire, i) => {
  const isClass =
    elem.children['1'].children['1'].children['1'].children['1'].children['1'].children['0'].data === 'Cours';

  if (elem.children.length !== 5 && isClass) {
    const classesOnlyTheory = parseTheoryClass(elem);
    classesRepertoire[i].schedule.push(classesOnlyTheory);
  } else if (isClass) {
    const theorySections = parseTheoryClass(elem);
    const labSections = parseLabClass(elem);
    classesRepertoire[i].schedule.push(theorySections, labSections);
  } else {
    const classesOnlyLab = parseLabClass(elem);
    classesRepertoire[i].schedule.push(classesOnlyLab);
  }
};

const crawler = async (studyLevel: string, saveToDisk?: boolean): Promise<Class[]> => {
  const pageToVisit = `https://www.polymtl.ca/programmes/cours/horaire?cycle=${studyLevel}`;
  logger.info(`Visiting page ${pageToVisit}`);

  const response = await fetch(pageToVisit);
  const body = await response.text();
  const $ = cheerio.load(body);
  const classesRepertoire: Class[] = [];

  $('.pane-content')
    .find('h2')
    .each((i: number, elem: any) => {
      const className: string = elem.children[0].children[0].data;
      const credits: number = elem.children[1].data.match(/(\d+)/)[0];
      classesRepertoire.push({
        name: className,
        credits: credits,
        schedule: [],
      });
    });
  logger.info('Class names done');

  $('.pane-content')
    .find('.horaire')
    .each((i: number, elem: any) => {
      parseClass(elem, classesRepertoire, i);
    });

  if (saveToDisk) {
    fs.writeFileSync(path.join(__dirname, '..', 'logs', 'classes.json'), JSON.stringify(classesRepertoire));
  }
  return classesRepertoire;
};

export default crawler;
