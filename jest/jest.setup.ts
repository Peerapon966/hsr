// set up jest-created test environment after the test framework is installed
// (e.g., extending the jest global 'expect' object with custom methods like toBeInTheDocument, etc.)
// (can now mess with jest configuration or object)

import "@testing-library/jest-dom";

jest.mock("next/font/google", () => ({
  Inter: () => ({ className: "inter-font-class" }),
}));

jest.mock("next-intl", () => ({
  ...jest.requireActual("next-intl"),
  useLocale: jest.fn().mockReturnValue("en-us"),
}));

jest.mock("@/services/content/fetchNewsItems", () => ({
  fetchNewsItems: jest
    .fn()
    .mockReturnValue({ newsItems: [], hasMore: false })
    .mockReturnValueOnce({
      newsItems: [
        {
          news_id: 126559,
          title: "Version 2.6 Annals of Pinecany's Mappou Age Update Details",
          intro:
            "Laughter, song, and dance linger all day, and by twilight, we sleep and do not wake — this dream world is like an old banana peel, covered in dark stains, how intolerable! Seek the true path, and extinguish this Mappou Age of the Dharma!",
          image:
            "https://fastcdn.hoyoverse.com/content-v2/hkrpg/126559/70b16443e3784fe9343d559682f24243_8988401657415501368.jpg",
          created_at: "2024-10-23T00:00:00.000Z",
        },
        {
          news_id: 126558,
          title:
            'Keeping Up With Star Rail — "Unknowable Domain" Special Program | Honkai: Star Rail',
          intro:
            "An uninvited guest? A guest crashed? Why does the snowy owl host laugh with such sudden and wild delight?\n\nQuickly clearing stages? Pitter-patter? What makes the snowy owl's mood rise to such jubilant heights, and climb further still?\n\nStay tuned for this episode of Keeping Up With Star Rail Special Program: Unknowable Domain. AKA: \"The Arduous Path of the Host & and Pleasant Testing Experiences\"\n\nLet's review this new universe in a very special Keeping Up With Star Rail!",
          image:
            "https://fastcdn.hoyoverse.com/content-v2/hkrpg/126558/874379b2d993bc4ae502fd2c8a976dbc_6620224834393919277.jpg",
          created_at: "2024-10-22T11:00:00.000Z",
        },
        {
          news_id: 126538,
          title: 'Rappa Trailer — "No Dazzle, No Break" | Honkai: Star Rail',
          intro:
            "Cosmic ninjutsu contains myriad permutations. Hunting the wicked and the demonic, the truth in protection of the weak, I spake. As one who sneaks and one who art heroic, A pledge I make, no dazzle, no break!",
          image:
            "https://fastcdn.hoyoverse.com/content-v2/hkrpg/126538/3e7a433ad735f7c29a24c306a461219d_5991893133269531704.jpg",
          created_at: "2024-10-21T05:00:00.000Z",
        },
        {
          news_id: 126484,
          title:
            'Animated Short: "Cosmic Ninjutsu Inscriptions — Havoc Exorcism: Lunar Vileslayer Scroll" | Honkai: Star Rail',
          intro:
            'The vast expanse of the boundless silver sea conceals countless fiendlings beneath its surface. Border villages fall under the onslaught of these fiendlings, and even the once-bright moon above has turned into a tyrant.\n\n"Whomst defends the world\'s justice? Whomst sees through the deceit of vice and indulgence? Whomst will wipe out these evildoers? Whomst will protect the light of ten thousand homes?"\n\nThe weak are silenced by sinister laughter, leaving only a sorrowful sigh. But when the people',
          image:
            "https://fastcdn.hoyoverse.com/content-v2/hkrpg/126484/c6bac1e17293939ac936381571ea803f_6036543992263462863.jpg",
          created_at: "2024-10-18T05:00:00.000Z",
        },
        {
          news_id: 126403,
          title:
            "Keeping up with Star Rail — Rappa: Whiteowl Ninja's Bursting Scroll | Honkai: Star Rail",
          intro:
            "The studio is ablaze.\n\n\"Hee-yah!\" Mr. Silvergun Shura bursts into the studio set and casts Whiteowl Ninja into the provisions concoction cauldron.\n\nHow merciless! Even the Great Lan has avoided THEIR gaze.\n\nCan Whiteowl Ninja thwart Mr. Silvergun Shura's incursion and forfend the outcome of becoming delicious avian wing tip?\n\nThank you for tuning in to this special Interastral Peace Entertainment program, Keeping up with Star Rail — Rappa: Whiteowl Ninja's Bursting Scroll\n\nThis is another side o",
          image:
            "https://fastcdn.hoyoverse.com/content-v2/hkrpg/126403/5328462a3fef17f45af7f569ead277b8_334130075782197749.jpg",
          created_at: "2024-10-16T05:00:00.000Z",
        },
      ],
      hasMore: true,
    })
    .mockReturnValueOnce({
      newsItems: [
        {
          news_id: 126385,
          title: "Simulated Universe: Unknowable Domain Highlights Page",
          intro:
            "The highlights page for the new V2.6 Simulated Universe gameplay is now live. Come and check out the detailed gameplay information",
          image:
            "https://fastcdn.hoyoverse.com/content-v2/hkrpg/126385/46cf273d047e3447b2d47e94443d3f06_5039624550679551497.jpg",
          created_at: "2024-10-12T05:00:00.000Z",
        },
        {
          news_id: 126380,
          title:
            'Version 2.6 Trailer — "Annals of Pinecany\'s Mappou Age" | Honkai: Star Rail',
          intro:
            "Laughter, song, and dance linger all day, and by twilight, we sleep and do not wake — this dream world is like an old banana peel, covered in dark stains, how intolerable! Seek the true path, and extinguish this Mappou Age of the Dharma!",
          image:
            "https://fastcdn.hoyoverse.com/content-v2/hkrpg/126380/cef0abd12dd761ab7fadb820c25e5c7e_8527339495795645479.jpg",
          created_at: "2024-10-11T13:00:00.000Z",
        },
        {
          news_id: 126142,
          title:
            'Lingsha Trailer — "Burning Scent of Home" | Honkai: Star Rail',
          intro:
            'This medicine causes yin and yang to rise and fall, and balances internal heat and dampness. It can save the patient from immediate harm, yet it cannot be taken long-term. That medicine is called cinnabar, otherwise known as... "Lingsha."',
          image:
            "https://fastcdn.hoyoverse.com/content-v2/hkrpg/126142/c59393da055c92e41070db61e4b59f9c_7826661547193952275.jpg",
          created_at: "2024-09-27T05:00:00.000Z",
        },
        {
          news_id: 126106,
          title:
            "Keeping up with Star Rail — Lingsha: Where Does One Purchase an AromaSync Phone? | Honkai: Star Rail",
          intro:
            'To the new Cauldron Master of the Xianzhou Luofu, everyone has their own unique scent. We invite Master Lingsha on this program to answer a question: How should we become a fine-smelling Intellitron? Her generous answer: "Be charitable and few of vices... But most importantly, shower."\n\nThank you for tuning in to this special Interastral Peace Entertainment program, Keeping up with Star Rail — Lingsha: Where Does One Purchase an AromaSync Phone?',
          image:
            "https://fastcdn.hoyoverse.com/content-v2/hkrpg/126106/0572426c8dd1cd58f081979eacb1f006_11938043944233648.jpg",
          created_at: "2024-09-25T05:00:00.000Z",
        },
        {
          news_id: 125792,
          title:
            'Version 2.5 "Flying Aureus Shot to Lupine Rue" Version Update',
          intro:
            "The sky bends. The wolves lurk. The hunter comes bearing a lone bow, striding forth into the fray. But the true place of the hunt dwells within...",
          image:
            "https://fastcdn.hoyoverse.com/content-v2/hkrpg/125792/f609dc242f0b4a1a0028af26408ea35a_3211806139185837436.jpg",
          created_at: "2024-09-10T00:00:00.000Z",
        },
      ],
      hasMore: false,
    }),
}));
