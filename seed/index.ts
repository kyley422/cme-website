import * as Fs from 'node:fs/promises';
import * as Argon2 from 'argon2';
import * as Z from 'zod';

import * as Blob from '@/server/blob';
import database from '@/server/database';
import * as Schema from '@/server/database/schema';

const main = async () => {
  const env = await Z.object({
    SEED_ADMIN_EMAIL: Z.string().email(),
    SEED_ADMIN_PASSWORD: Z.string().transform((s) => Argon2.hash(s)),
  }).parseAsync(process.env);

  // create admin user
  await database
    .insert(Schema.Admin.user)
    .values({
      email: env.SEED_ADMIN_EMAIL,
      password: env.SEED_ADMIN_PASSWORD,
    })
    .onConflictDoUpdate({
      target: Schema.Admin.user.email,
      set: { password: env.SEED_ADMIN_PASSWORD },
    });

  await database.delete(Schema.Content.section);
  const sections = await database
    .insert(Schema.Content.section)
    .values([
      {
        page: 'home',
        heading: 'The Chinese Music Ensemble at UCLA',
        body: 'Beginners and experienced musicians are welcome to join the UCLA Chinese Music Ensemble. We offer students the opportunity to explore traditional Chinese music through performance. Directed by Professor Chi Li, the ensemble features a variety of traditional Chinese instruments. We provide a cultural bridge, promoting appreciation and understanding of Chinese musical heritage within the UCLA community and beyond.',
      },
      {
        page: 'about',
        heading: 'About',
        body: "The UCLA Herb Alpert School of Music's Chinese Music Department was established in 1958, by the late Professor Tsun-Yuen Lui and in 1997, the UCLA Chinese Music Ensemble was formed and directed by Professor Chi Li. We strive to promote Chinese arts and culture at UCLA and in the greater Los Angeles community. Each year, over 100 UCLA students from all departments of campus join the ensemble to perform arias from Kun opera, silk-and-bamboo music from the Shanghai area, folk dances for festive celebration, zheng zither music in the Keijia style from Canton Province, and modern compositions for an ensemble of traditional Chinese wind and string instruments.",
      },
      {
        page: 'about',
        heading: 'Our Director',
        body: 'Professor Chi Li is a highly accomplished performing artist on the erhu and a prolific educator of Chinese music. After graduating from the Conservatory of Chinese Music (Beijing), she served as the erhu soloist at the National Traditional Orchestra of China (the most renowned orchestra of Chinese musical instruments) and frequently performed in presidential concerts in Beijing during the 80s. In the U.S., she has been featured in concerts held at prestigious venues such as Madison Square Garden (New York), Ronald Reagan Building (Washington D.C.), and Avery Fisher Hall/Lincoln Center (New York). She was a recording soloist for the 2019 Oscar winner short film "Bao".',
      },
      {
        page: 'about',
        heading: 'Student Leadership',
        body: 'The success of the UCLA Chinese Music Ensemble is driven by dedicated student leaders who ensure smooth operations and a vibrant presence. They secure funding for costs like instrument maintenance and guest artist performances, keeping our programs accessible and high-quality. Talented students design our programs and posters, reflecting our performance essence. The social media team engages the community with updates and behind-the-scenes content. Stage managers handle logistics, coordinating setups, performers, and technical aspects. Producers and associate producers organize rehearsals, schedules, and oversee program details, bringing our artistic vision to life. These diverse roles make our ensemble thrive, fostering appreciation for Chinese music and culture at UCLA and beyond.',
      },
    ])
    .returning({ id: Schema.Content.section.id });

  const [aboutImage, guzhengImage] = await database
    .insert(Schema.Content.image)
    .values([
      { data: await Fs.readFile('seed/image/about.png'), type: 'image/png' },
      { data: await Fs.readFile('seed/image/guzheng.png'), type: 'image/png' },
    ])
    .returning({ id: Schema.Content.image.id });

  await database
    .insert(Schema.Content.sectionImage)
    .values(sections.map((s) => ({ section: s.id, image: aboutImage.id })));

  await database.insert(Schema.Content.instrument).values([
    { title: 'Guzheng', image: guzhengImage.id },
    { title: 'Guqin', image: guzhengImage.id },
    { title: 'Pipa', image: guzhengImage.id },
    { title: 'Erhu', image: guzhengImage.id },
    { title: 'Dizi', image: guzhengImage.id },
    { title: '扬琴 Yangqin', image: guzhengImage.id },
    { title: '柳琴 Liuqin', image: guzhengImage.id },
    { title: 'Ruan', image: guzhengImage.id },
    { title: 'Xiao', image: guzhengImage.id },
    { title: 'Sheng', image: guzhengImage.id },
    { title: 'Suona', image: guzhengImage.id },
    { title: 'Sanxian', image: guzhengImage.id },
    { title: 'Percussion', image: guzhengImage.id },
    { title: 'Kunqu', image: guzhengImage.id },
    { title: 'Cello', image: guzhengImage.id },
    { title: 'Hulusi', image: guzhengImage.id },
  ]);
};

main();
