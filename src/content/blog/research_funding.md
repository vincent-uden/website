---
layout: ../../layouts/BlogLayout.astro
title: "[TODO] Research Funding"
preview: ...
date: August 2026
time: "16:00"
timestamp: 1760575134
---

While I usually write about my adventures in software my day job for the last two years has actually been as a research engineer in the field of energy harvesting and energy-autonomous sensing.

As I'm leaving research behind to work as a software developer I've compiled my thoughts on the increasingly frustrating state of research in Europe (and perhaps elsewhere). Acquiring funding has slowly but surely eaten away at the time and money spent doing actual research and is about to eclipse the research in terms of cost. 

Before we can discuss the dire state of funding and applications I should describe the most common way in which research and innovation is quantified.

## The TRL scale

 Research can happen at many levels, from the most theoretical high energy physics with no market applications to optimisations on the tiniest details on a consumer product. The technology produced by the research or innovation is usually placed on the *Technology Readiness Level* (henceforth TRL) scale.

It was originally developed by NASA in the 1970s to describe the readiness level of different technologies for space flight. 7 levels of readiness were defined and used in order to manage the risk of incorporating new advances in technology into their space operations.

The scale was redefined in the 80s to consist of 9 levels which is still the case today. Eventually the scale was de facto used in a lot of research proposals seeking funding from the European Commission via the *EU Horizon* program <label for="eu-horizon" class="sidenote-number"/><input id="eu-horizon" type="checkbox" />. In 2014 an actual definition was determined by the commission which we can compare to the original NASA definitions below:

<span class="sidenote">
<a href="https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en">https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en</a>
</span>

| TRL&nbsp;Level | NASA Definition                                                                                 | EU Horizon Definition                                     |
| --------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 1         | Basic principles observed and reported                                                          | Basic principles observed                                 |
| 2         | Technology concept and/or application formulated                                                | Technology formulated                                     |
| 3         | Analytical and experimental critical function and/or characteristic proof-of-concept            | Experimental proof of concept                             |
| 4         | Component and/or breadboard validation  in laboratory environment                               | Technology validated in lab                               |
| 5         | Component and/or breadboard validation in relevant environment                                  | Technology validated in relevant environment              |
| 6         | System/subsystem model or prototype demonstration in a relevant environment (ground or space)   | Technology demonstrated in relevant environment           |
| 7         | System prototype demonstration in a space environment                                           | System prototype demonstration in operational environment |
| 8         | Actual system completed and "flight qualified" through test and demonstration (ground or space) | System complete and qualified                             |
| 9         | Actual system "flight proven" through successful mission operations                             | Actual system proven in operational environment           |

As we can see the EU Horizon definitions are mostly a generalisation of the NASA definitions to allow them to classify non-space research.

Mihály Héder in his article from *THe Public Sector Innovation Journal* [3] concludes this generalisation has led to a gradual loss of sophistication and concreteness which was present in the original usage by NASA. This is most succinctly demonstrated by the fact that the TRL scale was developed as a risk management strategy, to facilitate the elimination of risk, something which is both unattainable and undesirable in the case of research.

While I am partial to this attitude I am not entirely convinced that the TRL scale or something like it (perhaps the 6-scale Commercial Readiness Index which continues the TRL scale beyond stage 9) is entirely useless for describing the level of research in an application.

## Divine foresight

During an application the researcher must naturally describe the subject matter of their investigation. This includes the actual area of study and its possible applications in industry or further research.

If you actually want your application to be granted, this is not enough. Ideally you should know what you will be able to discover during the research project of half a decade. A qualitative prediction regarding techniques, methods or phenomena can suffice but to really get your point across you should complement this with quantitative predictions of your future success (failure is of course **not** an option in your future if you wish for your application to be granted).

Let's take a real example from a project that has been granted, REFEST [2]. It is a project developing retro-fitted solutions for small fishing vessels in the Baltic sea to reduce their greenhouse gas emissions. Among other things the project partners will investigate drag reduction, power management systems, hybridisation, hull optimisation, air lubrication (the part which I have been a small cog in the machinery for) and solar power. All of this within a 3 year period. That is our qualitative statement.

Since this project was granted and is in progress it of course had some quantitative promises as well:

> REFEST aims to build procedures and technologies to secure the reduction of fuel consumption and GHG emissions up to 40% reduction compared to the original design.

Now you might not be an expert in boats or greenhouse gas emissions for that matter but this number should set off warning bells in your brain, or at least gut feeling. Improving **any established technology** way past TRL 9 (such as fishing vessels) by 40% in **any metric** in **3 years** is incredibly optimistic to say the least.

Note that I am not levying any criticism towards the researchers or project leaders of this EU Project or any other for that matter. Their job is to submit applications that the European Commission will grant and so they do. There is a way to derive the figure of 40%, namely by assuming that all project partners will be successful and hit their targets, a scenario which is exceedingly unlikely but theoretically possible.

Much has been written on the difficulty of estimating technical work which I wont reiterate here. For research this impossible task is an existential question which must be answered not in terms of sprints, days or t-shirt sizes (pick your favourite agile/scrum framework), but in terms of years and millions of Euros.

## Optimismⁿ

Stacking year after year of optimistic estimations on top of each other in competition for grants with other optimistic estimates from other European researchers leads to an accelerating race to the top (of the scale of unrealistic expectations). As applications grow and grow in their scope, quality or novelty the consortia applying to the projects must also grow increasingly impressive to give the impression that the projects are possible to pull off. 

Complexity explodes on all fronts, especially in the amount of paperwork needed to submit an application. After all you do need to explain how you will pull off your possibly impossible estimate if you hope to get any money.

In a relatively recent column in *Nature* [4], Gerald Schweiger shows with an example how European research might have already passed the catastrophic point where the total cost of applications for a project exceeds the funding of the project known as the *Szilard point*. Even if all the groups applying for the project do nothing but apply for projects, statistically they will lose money over time.

If we're to be optimistic once again, this might not be the case for all applications. But the incentive structure is set up to steer European research barrelling towards the Szilard point and we certainly are close to it, if not past it already.

## The Szilard point in action

To convey just how ridiculous the system has gotten, why don't we look at another example. This time the European Union isn't even involved. We've managed to screw this one up on our own, Swedish soil.

The Swedish government has released a call for the formation of excellence clusters in strategic areas of research [7]. When all is said and done one such cluster would be entitled to between 40 and 100 million crowns (10 Swedish crowns is roughly 1 euro) of funding *per year* over a 5-year period. That is a lot of money and as such must be treated with care.

Clusters are formed organically with academic institutions as the heads with industry backing them up with innovation and relevant industrial use cases to form a comprehensive research operation across the TRL scale. Prospective clusters must go through a multi-step application process in which 191 initial applications were made.

In September of 2025 40 groups were chosen from these 191 applications. The 40 groups were allowed to *continue the costly application process*.  No research is being conducted yet. The actual research call doesn't occur until April-June of 2026.

During the following half a year the prospective clusters prepare for a final submission where only one cluster per strategic research area will be granted. This is of course very expensive which the state compensates for with 1.2 million crowns given to *each* of the 40 applicants [8].

That's right. Due to the bureaucratic overhead of these incredibly complicated research calls the state spends 48 million crowns just to help applicants *submit an application*.

From these 40 groups some unknown, smaller number will be chosen to receive the big prize of up to half a billion crowns over 5 years.

As I hope is clear by now, I am all for funding *research*. This is something else entirely. If one is in a bad mood one might reach for the term *bureaucratic masturbation* to describe the situation.
## What do we do?

Schweiger recommends a few alternatives to remedy the situation:

1. Avoid overly broad funding calls. Generality leads to increased competition, leading to more institutes competing for the same grant thus driving up costs.
2. Staged application procedures where a smaller, initial application determines who gets to submit full scale proposals.
3. More experimental models like a lottery for who gets to submit proposals or democratic voting from peers on who's deserving of funding.

It is difficult for me to evaluate if any of these methods would support a more efficient process of funding research even though I feel sympathetic to the ideas. Each of the two models of point 3 are backed by studies cited by Schweiger [5,6].

If you are one applicant of over 200 the process might as well be a lottery, why not save yourself (and all the other applicants) some time (and money)?

A free market solution is unlikely to benefit research since the return on investment, while enormous is on a time scale far too grand for the undulating economy of capitalism. Furthermore it is usually not the researcher (or institute) themselves who reap the economic rewards of their toil, but rather some distinct company applying the research to a commercial product.

**This isn't wrong. It's how it's supposed to be.** But it does highlight how a market system can't be expected to invest in research, especially at the lower ends of the TRL scale.

Are there too many entities wanting to do research? Maybe, perhaps. I don't even know how to judge a statement like that. What I do know is that there is so much important research left in the world if we are to overcome the existential threats before us. Climate change, disease, starvation, energy crises, and others are not going to solve themselves. We *have to* solve them. We *have to* make sure funding actually results in research. Not just driving the treadmill of infinite bureaucracy.

Can we even expect government, let alone one as complex of the European Union to give out the 93.5 billion euros they've already earmarked for research in 2021-2027 in an efficient manner? What about the 175 billion euros that are planned for 2028-2034 as part of the Horizon program? 

*I don't know. But I'm not sticking around to find out.*

## Sources


[1] https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en 

[2] https://www.refest-project.eu/objectives/

[3] https://web.archive.org/web/20171011071816/https://www.innovation.cc/discussion-papers/22_2_3_heder_nasa-to-eu-trl-scale.pdf

[4] https://www.nature.com/articles/d41586-025-04060-x

[5] https://www.nature.com/articles/s41467-025-65660-9

[6] https://link.springer.com/article/10.1186/s41073-017-0040-0

[7] https://www.vr.se/english/applying-for-funding/calls/2026-02-04-excellence-clusters-for-groundbreaking-technologies.html

[8] https://www.vr.se/english/just-now/news/news-archive/2025-09-18-strong-interest-in-network-grant-for-planning-future-excellence-clusters-for-groundbreaking-technologies.html

