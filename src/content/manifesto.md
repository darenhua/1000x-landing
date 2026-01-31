### I want myself (a junior level engineer) to be able to use AI like a principal engineer.

## preface

I think that most people who adapted to AI coding received at least a 3x speed boost in engineering capacity. 

I think that the *senior+* engineers who decided to let go of old habits and try this new thing are now **leagues beyond** what other engineers are able to do. 

*It's a well-deserved unfair advantage.*

Only through **decades** of reps do you start to pattern match. Veterans know the problems that come with writing production code and what's more, they know the tradeoffs. Battle scars let them anticipate design options given constraints and requirements that they've seen hundreds of times. 

This puts them in a position where they have intuition about the {% footnote note="Vibe coders prompt by OUTCOME and leave the problem solving of the PROCESS all to AI. That's why it's VIBE coding, the desired outcomes in console/client are the only inputs. \n[ie: 'claude do this (vague), pls don't fail'] \n\n Engineers can prompt by outcome and their intuition allows them to supply ideas of PROCESS. \n[ie: 'claude do this (very clear), try this way (process) / let me review the plan]" %}**how**{% /footnote %}.

They can be critical, question, and understand thousand line implementation plans.

But I'm not in that position and the majority of developers in the world are not *senior+* engineers. 

I'm a CS student and I hear nonstop from my peers -- their fears that they will be replaced in industry because they never formally learned to code. They use AI to write everything. I have peers who swing the opposite direction: pretending that claude code doesn't even exist because they want to put in the reps themselves and learn how to code the "right way". I hear from industry, that junior engineers open slop PRs and seniors are left to suffer in code review.

1000x dev is the tool that takes you from being a {% footnote note="By earning your own engineering insight. \n By being exposed to problems and the paths to solve them. \nBy being in the loop about the 'how'" %}programmer to an engineer{% /footnote %}. 

## sub problems

The most important opinion that I embed into 1000x dev is: 

**you must own your subproblems and the solutions to them**.

The *1000x way* is to think of a project as a decomposition of "unknowns". These are your risky subproblems and if you solve them, you know EXACTLY how to build your project. 

Before you start development, make a plan for how you're going to bring your dream into reality. {% footnote note="Design is making decisions on how the solution should work.\n\n Make decisions at the right level of abstraction. \n\n Not too zoomed in, that's implementation, not a decision. Inflexible. \n\n Not too zoomed out, you might not know how to do it. Too much risk." %}Design a solution.{% /footnote %} This mental model defines your subproblems. 

Subproblems for building LinkedIn:
- do you know how an upvote will update on everyone's screen?
- do you know what the users data model looks like?
- do you know how to track post view statistics?

Compare this to the way that junior programmers might normally work. Very little upfront planning. Vague understanding of the requirements. Tackle requirement 1 with claude auto-accept. Move onto requirement 2 with claude auto-accept. By requirement 6, the codebase is a mess and prompts are full of "claude please revert you broke it" because you have no understanding of your project to guide claude at all.

The reality for us junior programmers is that you probably don't know how to build your project, even without {% footnote note="(ie: security, availability, performance)" %}constraints{% /footnote %}. This is the muscle we have to train.

You probably don't understand your problems. 
- likely missing many assumptions

Even if you do, you probably don't understand how to decompose it.
- likely not working at the right level of abstraction

Even if you do, you probably don't understand how to solve these subproblems. 
- need to understand the "process", the "sequence of decisions", the "how"

Then, what if you had a folder full of code examples, each resolving a subproblem? And you made sure that you understood the logic of each code example before you start integrating them into your codebase? {% footnote note="give me your email at waitlist, and I can show you what workflow I want" %}That's the workflow I want.{% /footnote %}

## verify

Is AI able to solve risky subproblems? 
- Exercise: boot up claude code right now and ask it to make chess. 

It's beautiful in a way, how AI is like this treasure trove of solutions to most problems, and separating you from paradise is this massive gate called the prompt. 

{% footnote note="In fact, if you enumerate your risky subproblems en-masse, you can create a 'schedule', a backlog of experiments/spikes that AI can solve as you sleep. This works manually, and it's automated into 1000x dev. \n\n Also, I've coded for quite a while before AI so I don't say lightly that AI is a much much better problem solver than I am." %}AI can solve problems much better than I can.{% /footnote %} 

What it can't do is **verify** that it's correct. That's one super-high leverage task left for humans. It takes <30s to click around and see if it's broken, or if it's magic.

So, AI lets us speedrun problem-solving with **prototypes**. Prototypes are scrappy codebases that contain solutions to one or many subproblems. The core *1000x insight* here is:

**if it works, it contains the solution**. 

Build prototypes that work. Verify. Extract the minimal code that makes it work, and understand the solution. (This becomes a **code example** that you can learn from and **give AI as context**. ) Use this code example as reference to build prototypes that solve harder parent subproblems. Verify. Extract code examples from parent subproblems. {% footnote note="This is the ONLY way I code today. It's not automated -- but I do this manually with claude code and whiteboard. I have an 'engineering journal' full of code artifacts, and it's a 1000x multiplier." %}Rinse and repeat{% /footnote %}

Along the way you will build understanding of your problem. Maybe you started off building LinkedIn by trying to solve the SSE integration subproblem, and then after solving the chat subproblem on top of that, and the notifications subproblem on top of that, you realize that instead of using SSE, you should've used websockets. 

That's expected. You didn't decompose the problem correctly. You're learning.

But you own the subproblems and its solutions, so you're fine. You preserve your understandings of chat and notifications. You preserve your understandings of challenges that happen when writing glue code. So, use AI to speedrun even more prototypes knowing you've done this already. 

Look! You now have *engineering insight* -- you can guide AI on **how** you want websockets to be integrated because you solved a similar problem already (with SSE).

Over time, you build something like an {% footnote note="credit: oliver keh." %}engineering journal{% /footnote %}. A repository full of code insights. Some are global, like button UIs, form validations, email sending, auth -- they recur across projects. Some are scoped to a project, like a users data model code example for your LinkedIn clone.

And just imagine. If you or AI can't solve a problem -- can you search the web for REAL, WELL-ENGINEERED PROJECTS that have solved a *related subproblem*??? Do you truly think that your problem is new under the sun? Or are you reinventing the wheel, and the blueprints to the wheel are somewhere on *github*?

## specify and verify

At this point, I want to clear something up. It might sound from everything so far, that 1000x dev is an educational tool.

No - the main goal is to find a way of working that improves my engineering capacity by 1000x.

If I could wake up to a folder of 20 "mini-projects" that I could *verify* very quickly... Essentially waking up to 20 PRs that eliminate the nearest bottlenecks in the project development that I {% footnote note="because they're just prototypes that don't tech debt my main codebase at all." %}don't have to do code-review for{% /footnote %}... I'm 100x.

Prompting back and forth is not time efficient. A project is probably thousands of followup-prompts from completion. You can't parallelize follow-up prompts well. Each prompt probably takes 5 minutes. Boilerplate prompts are even worse. 

Verifying a live preview is very high efficiency. A project is probably 20 well-designed nested subproblems away from completion. You can make prototypes and variants in parallel. Verifying takes less than 30 seconds and my favorite benefit: *it's so fun*.

- Approve -> reverse engineer a code example which will make its way into the main codebase. 
- Deny -> decompose the problem even further, use failure learnings to guide a different implementation, search for related subproblems online, or simply follow-up prompt. You have options. 

Then, imagine if an {% footnote note="This is different from the traditional spec-driven development, where sometimes people interview AI to generate technical specs full of architecture diagrams and phases (AI generates the steps to get to the goal).\n\n Remember, you're a junior programmer. You can try reading the spec but you haven't done any of the things the spec is mentioning, so you're just doing glorified auto-accept." %}interview conversation{% /footnote %} with AI leads to tens of *relevant* prototypes for AI to make? The interview reveals up-front **what you want**. Once you know what you want, you have to define yourself, **how** you're going to get there. Once you define this sequence of steps, you can break out little experiments that you think would help you de-risk the process. This is the 1000x dev definition of **specification**.

With this, we exploit AI's superpower of being able to generate prototypes really fast. We mitigate AI's weakness of creating tech debt -- because as soon as we extract a code example, we can throw away the prototype. {% footnote note="The tradeoff, is that your job now becomes managing chains of prototypes. Sometimes you'll be tempted to just work off of a prototype that looks really good. Don't get lazy -- if you understand how to reproduce the aspects of what you like, you can have the best of both worlds." %}Approving a code example is harmless. {% /footnote %} 

Spend your time on high leverage tasks: specifying what you want to be built (to schedule many prompts in one go), and verifying their outputs (to extract value out of slop). 