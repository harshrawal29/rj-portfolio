export type ContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export interface Quote {
  text: string
  author?: string
}

export interface Inspiration {
  slug: string
  title: string
  image: string
  heroImage: string
  quote: Quote
  contentBlocks: ContentBlock[]
}

export const inspirationSettings = {
  sectionLabel: 'INSPIRATIONS',
  sectionHeading: 'WHAT INSPIRES ME',
  scrollPrompt: 'Scroll To Explore \u2193'
}

export const inspirations: Inspiration[] = [
  {
    slug: 'art',
    title: 'ART',
    image: '/images/inspirations/art.png',
    heroImage: '/images/inspirations/art.png',
    quote: {
      text: "Art is not what you see, but what you make others see.",
      author: "Edgar Degas"
    },
    contentBlocks: [
      { type: 'heading', content: 'Where Ideas Wander' },
      { type: 'paragraph', content: 'Ask me where my love for design started, and honestly, it goes back further than the word design itself. It started with a sketchbook, a pencil and that small thrill of turning a blank page into something.<br><br>Over the years art has turned into my playground, a place to experiment without worrying about rules. I started out with basic sketches and traditional work, but lately I\'ve been getting into acrylic painting and finding out how much I like playing with texture, layers and bold colour. Every medium has its own personality. <b>Watercolour teaches patience, acrylic rewards experimenting, and digital art opens up options that feel endless.</b> I don\'t stick to just one, because each one teaches me something the others don\'t.<br><br>What gets me most is how artists get emotion across without a single word. One brushstroke, an unusual colour choice, even blank space on a canvas, all of it can say something. I carry that into my design work too. Brand identity, packaging, digital work, whatever it is, I\'m always thinking about the feeling behind the visual.<br><br>To me, art and design aren\'t really separate things. Art is where my curiosity keeps growing, where ideas take root, and where I get reminded that sometimes the best work starts with just picking up a brush and following it somewhere.' },
    ]
  },
  {
    slug: 'music',
    title: 'MUSIC',
    image: '/images/inspirations/music.png',
    heroImage: '/images/inspirations/music.png',
    quote: {
      text: "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.",
      author: "Plato"
    },
    contentBlocks: [
      { type: 'heading', content: 'Finding a Rhythm Outside of Design' },
      { type: 'paragraph', content: 'Music has always been part of how I work. Designing, sketching, painting, or just winding down after a long day, there\'s usually something playing in the background.<br><br>I play the guitar too, not with any plans of getting on a stage, just because it\'s one of those things that makes me slow down and enjoy the process itself.<br><br>My playlists jump between jazz, rock and Bollywood. Some days it\'s the loose, improvised feel of jazz, other days classic rock keeps my energy up, and sometimes nothing beats an old Bollywood song. Every genre has its own character, but somehow they all manage to tell a story and stir something.<br><br>The more I think about it, the more music and design start to look alike. Both come down to rhythm, balance, contrast and timing. A good composition isn\'t always about adding more. Sometimes it\'s about knowing what to cut.<br><br>For me music isn\'t just background noise. It shapes how I create, helps me find focus, and every now and then hands me the perfect soundtrack for whatever I\'m working on next.' },
    ]
  },
  {
    slug: 'reading',
    title: 'READING',
    image: '/images/inspirations/reading.png',
    heroImage: '/images/inspirations/reading.png',
    quote: {
      text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
      author: "George R.R. Martin"
    },
    contentBlocks: [
      { type: 'heading', content: 'Between the Pages' },
      { type: 'paragraph', content: 'If there\'s one genre that makes me lose all track of time, it\'s a good mystery. Hand me an unexpected twist, a psychological thriller, anything that keeps me guessing till the last page, and I\'m hooked.<br><br>Alongside that, I read a fair number of books on personal growth, the kind that push back on how I think. They\'re a good reminder that creativity isn\'t really about raw talent. It\'s more about discipline, curiosity and staying willing to learn.<br><br>Reading has shaped how I approach design more than I expected it to. A good book leads its reader through a story carefully, giving away just enough to keep them curious. Good design works the same way for me. It builds an experience, says what it needs to clearly, and leaves people wanting to look a little further.<br><br>Books have taught me that details matter, the pacing, the word choices, even the typography on a cover. Nothing is really an accident. That\'s something I try to carry into every design I make.<br><br>Some books hand you answers. The ones I love most leave me with better questions.' },
    ]
  },
  {
    slug: 'travel',
    title: 'TRAVEL',
    image: '/images/inspirations/travel.png',
    heroImage: '/images/inspirations/travel.png',
    quote: {
      text: "Travel makes one modest. You see what a tiny place you occupy in the world.",
      author: "Gustave Flaubert"
    },
    contentBlocks: [
      { type: 'heading', content: 'Collecting Stories, City by City' },
      { type: 'paragraph', content: 'I\'ve always thought every city has its own character. Some show it through architecture, some through food, and some through the people you meet once and somehow never forget.<br><br>When I travel, ticking landmarks off a list interests me a lot less than finding the places guidebooks tend to skip. I like wandering through local markets, looking at handmade crafts, noticing old signboards, picking up postcards and just paying attention to the colours, patterns and typography that make a place feel like itself.<br><br>My favourite souvenirs usually aren\'t things I bought at all. They\'re photos of interesting doors, nice packaging from a local shop, a café menu with a clever layout, or some texture I noticed on an unfamiliar street. My camera roll is basically full of things most people would scroll straight past, but I know one of them will end up in a project eventually.<br><br>Travelling keeps reminding me that good design isn\'t confined to museums or studios. It\'s everywhere, tucked into ordinary life, waiting for someone curious enough to actually notice it.<br><br>Every trip shifts my perspective a little, and every place I visit quietly changes how I see, think and make things.' },
    ]
  }
]
