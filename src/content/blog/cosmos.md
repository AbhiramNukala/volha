---
title: "The Story Behind Cosmos: Building an Open-Source Mastodon Client"
description: "A fast, elegant, and open-source Mastodon client for the Fediverse"
pubDate: 2026-11-21
tags:
  - react-native
  - fdroid
  - release
  - playstore
author: Nukala Abhiram
featured: false
readingTime: 3 min read
---

## My First Blog, I Guess? The Story Behind Cosmos

Hello, guys!

This might be my first blog, but yeah, here we go. At least I'm trying something new, I guess!

It's been a few months since I started working on [Cosmos](https://codeberg.org/kekekuku/Cosmos), but I never really dared to share anything about the app or even thought about publishing it on F-Droid or any app store.

Why? Because there are literally hundreds of apps being released every day, and when it comes to Mastodon clients, there's probably a new one popping up every few minutes. So, naturally, I kept wondering: Why would anyone care about another Mastodon client?

But then I realised something. Not every project needs to be revolutionary or introduce something nobody has ever seen before. Sometimes, building something just to learn, experiment, and understand how things work is reason enough.

And that's exactly how Cosmos started.

## So, why did I build Cosmos?

I originally started building Cosmos to understand the underlying concepts of social media applications.

Things like how they work behind the scenes, how they feel to use, how users interact with different parts of the application, and how all these things come together to create a complete experience.

These are things we often overlook when building applications, especially when we're just following tutorials.

Most tutorials out there walk you through building yet another todo app or an e-commerce application. Don't get me wrong, there's nothing wrong with those projects. They're great for getting started.

But I always felt that something was missing.

They rarely explain what's actually happening under the hood. How does authentication work? How is user data stored? How does the application communicate with the backend? How are timelines fetched and updated? What happens when you interact with a post, follow someone, or upload media?

There are so many little things happening behind a seemingly simple interface.

I wanted to understand these things by actually building something rather than just watching someone else do it.

And what better way to learn about social media applications than by building one yourself?

That's how Cosmos slowly started taking shape.

## The F-Droid adventure (or should I say nightmare?)

Let's keep the development story aside for a moment.

Freaking F-Droid builds!

I honestly didn't expect the F-Droid release process to take this much time. It took almost my entire morning and afternoon just to get the build through all the required checks and tests.

Every time I thought I had fixed something, another issue showed up. Dependencies, build configurations, metadata, Gradle-related stuff... you name it.

At some point, I was just staring at the terminal, wondering what else could possibly go wrong.

But eventually, after going through all those errors and fixing things one by one, I managed to get the build passing.

And honestly, that itself felt like a small achievement.

For anyone who hasn't gone through the process, getting an app ready for distribution through F-Droid involves more than simply uploading an APK. There are metadata requirements, reproducible build expectations, source code verification, and a bunch of other things to get right.

It's a different experience compared to simply publishing an app somewhere and calling it a day.

## Oh, and I also migrated React Native!

As if the F-Droid process wasn't enough, I also decided to migrate Cosmos to the latest React Native version while preparing the release.

Yeah, probably not the best timing. 😂

The migration itself was another adventure. React Native developers really need to find a simpler way to handle version upgrades.

I understand that major versions come with breaking changes, dependency updates, and native configuration changes. But sometimes the migration process feels like you're rebuilding half of your project just to get it working again.

I guess part of this is on me for choosing React Native CLI over Expo. But still, I wish there were better tools to make this process less painful.

Anyway, Cosmos is now running on the newer React Native version, and that's another thing checked off the list.

## What's next?

I've finally raised a merge request with the F-Droid repository!

Now comes the waiting part. I need to see whether the F-Droid maintainers accept the app, whether any additional changes are required, and eventually, whether Cosmos makes it into the repository so end users can install and use it.

I'm not really sure how long the review process will take or whether everything will go smoothly, but that's part of the experience, I guess.

There is still a lot to do with Cosmos. I have plenty of ideas, improvements, and things I'd like to experiment with.

Some things might work out, some might not, and I'm sure I'll run into plenty more weird issues along the way.

But that's fine. That's how we learn.

## One last thing...

If you're reading this blog, especially if you somehow stumbled upon it by accident, lucky you! You're here at the very beginning of this little journey.

I'll try to keep posting updates about what happens with the F-Droid submission, the development of Cosmos, the technical challenges I run into, and the things I learn along the way.

I don't want this blog to be just another place where I announce releases and features. I'd rather share the actual development journey, including the things that break, the things that work, and all the little lessons in between.

Hopefully, there will be more blogs like this one.

Until then, wish me luck with the F-Droid review!

And if you're curious, here's the project:

[**Cosmos – Codeberg**](https://codeberg.org/kekekuku/Cosmos)

Cheers! 🚀