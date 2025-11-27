#!/usr/bin/env python3
"""
Parse Burnout Buddy markdown content files into complete JSON dataset
"""
import json
import re

# Read Insights file
with open('/mnt/project/Burnout_Buddy_Insights_Complete_Final.md', 'r') as f:
    insights_content = f.read()

# Read Actions file  
with open('/mnt/project/Burnout_Buddy_Actions_Draft_From_Insights.md', 'r') as f:
    actions_content = f.read()

# Read Restore cards file
with open('/mnt/project/Burnout_Buddy_Restore_Cards_Complete.md', 'r') as f:
    restore_content = f.read()

# Parse Insights
insights = []
insight_pattern = r'## (I\d+): "([^"]+)"[\s\S]*?\*\*Category:\*\* ([^\n]+)[\s\S]*?\*\*Theme:\*\* ([^\n]+)[\s\S]*?\*\*FRONT:\*\*[\s\n]+"([^"]+)"[\s\S]*?\*\*BACK:\*\*[\s\n]+(.+?)(?=\*\*GO DEEPER:)[\s\S]*?\*\*GO DEEPER:\*\*[\s\n]+.+?\s*(.+?)(?=\n---|$)'

for match in re.finditer(insight_pattern, insights_content, re.MULTILINE):
    insight_id = match.group(1)
    title = match.group(2)
    category = match.group(3).strip()
    theme = match.group(4).strip()
    front = match.group(5).strip()
    back = match.group(6).strip()
    go_deeper = match.group(7).strip()
    
    insights.append({
        "id": insight_id,
        "category": category,
        "theme": theme,
        "title": title,
        "front": front,
        "back": back,
        "goDeeper": go_deeper
    })

print(f"Parsed {len(insights)} insights")

# Parse Actions
actions = []
action_pattern = r'## (A\d+):\s*"([^"]+)"[\s\S]*?\*\*Pairs with:\*\* (I\d+)[\s\S]*?\*\*Category:\*\* ([^\n]+)[\s\S]*?\*\*FRONT:\*\*[\s\n]+"([^"]+)"[\s\S]*?\*\*BACK:\*\*[\s\n]+(.+?)[\s\S]*?\*\*TRY THIS:\*\*[\s\n]+(.+?)[\s\S]*?\*\*GO DEEPER:\*\*[\s\n]+.+?\s*(.+?)(?=\*\*PRACTICE WITH AI|\n---|$)'

for match in re.finditer(action_pattern, actions_content, re.MULTILINE):
    action_id = match.group(1)
    title = match.group(2)
    pairs_with = match.group(3)
    category = match.group(4).strip()
    front = match.group(5).strip()
    back = match.group(6).strip()
    try_this = match.group(7).strip()
    go_deeper = match.group(8).strip()
    
    actions.append({
        "id": action_id,
        "pairsWith": pairs_with,
        "category": category,
        "front": front,
        "back": back,
        "tryThis": try_this,
        "goDeeper": go_deeper,
        "practiceWithAI": None
    })

print(f"Parsed {len(actions)} actions")

# Parse Restore cards
restore_cards = []
restore_pattern = r'## (R\d+\.\d+)[\s\S]*?\*\*Level:\*\* (\d+)[\s\S]*?\*\*Level Name:\*\* ([^\n]+)[\s\S]*?\*\*FRONT:\*\*[\s\n]+"([^"]+)"[\s\S]*?\*\*BACK:\*\*[\s\n]+(.+?)[\s\S]*?\*\*Quote:\*\*[\s\n]+(.+?)[\s\S]*?\*\*Microcopy:\*\*[\s\n]+(.+?)[\s\S]*?\*\*Footer:\*\*[\s\n]+(.+?)(?=\n---|$)'

for match in re.finditer(restore_pattern, restore_content, re.MULTILINE):
    restore_id = match.group(1)
    level = int(match.group(2))
    level_name = match.group(3).strip()
    front = match.group(4).strip()
    back = match.group(5).strip()
    quote = match.group(6).strip()
    microcopy = match.group(7).strip()
    footer = match.group(8).strip()
    
    restore_cards.append({
        "id": restore_id,
        "level": level,
        "levelName": level_name,
        "front": front,
        "back": back,
        "quote": quote,
        "microcopy": microcopy,
        "footer": footer
    })

print(f"Parsed {len(restore_cards)} restore cards")

# Define all 15 challenges with their response texts
challenges = [
    {
        "id": "C1",
        "title": "I'm burned out",
        "question": "What's draining you most?",
        "responses": [
            {"id": "R1", "text": "The workload is impossible", "routesTo": "I1"},
            {"id": "R2", "text": "I never actually recover", "routesTo": "I7"},
            {"id": "R3", "text": "Meaningless overhead", "routesTo": "I10"},
            {"id": "R4", "text": "The work culture is toxic", "routesTo": "I10"},
            {"id": "R5", "text": "My values don't align", "routesTo": "I1"},
            {"id": "R6", "text": "I've lost my curiosity", "routesTo": "I6"},
            {"id": "R7", "text": "The goalposts keep moving", "routesTo": "I14"},
            {"id": "R8", "text": "I'm losing myself", "routesTo": "I3"}
        ]
    },
    {
        "id": "C2",
        "title": "I'm not appreciated at work",
        "question": "What's going unrecognized?",
        "responses": [
            {"id": "R1", "text": "My workload isn't recognized", "routesTo": "I29"},
            {"id": "R2", "text": "Team dynamics being created", "routesTo": "I4"},
            {"id": "R3", "text": "They're micromanaging", "routesTo": "I26"},
            {"id": "R4", "text": "They're playing favorites", "routesTo": "I27"},
            {"id": "R5", "text": "They don't have my back", "routesTo": "I28"},
            {"id": "R6", "text": "They keep changing direction", "routesTo": "I10"},
            {"id": "R7", "text": "They're not communicating clearly", "routesTo": "I13"},
            {"id": "R8", "text": "They're conflict-avoidant", "routesTo": "I12"}
        ]
    },
    {
        "id": "C3",
        "title": "Am I crazy or is this crazy?",
        "question": "What feels off?",
        "responses": [
            {"id": "R1", "text": "They say one thing but do another", "routesTo": "I10"},
            {"id": "R2", "text": "They're rewriting history", "routesTo": "I10"},
            {"id": "R3", "text": "The goalposts keep moving", "routesTo": "I14"},
            {"id": "R4", "text": "Toxic positivity", "routesTo": "I23"},
            {"id": "R5", "text": "Everyone sees it but no one says it", "routesTo": "I23"},
            {"id": "R6", "text": "I'm told I'm the problem", "routesTo": "I1"},
            {"id": "R7", "text": "Numbers don't match story", "routesTo": "I10"},
            {"id": "R8", "text": "Metrics changed after I succeeded", "routesTo": "I14"}
        ]
    },
    {
        "id": "C4",
        "title": "I'm stuck in my career",
        "question": "Where are you stuck?",
        "responses": [
            {"id": "R1", "text": "No clear path up", "routesTo": "I17"},
            {"id": "R2", "text": "Skills underutilized", "routesTo": "I29"},
            {"id": "R3", "text": "Right people don't know what I can do", "routesTo": "I29"},
            {"id": "R4", "text": "It's politics, not performance", "routesTo": "I10"},
            {"id": "R5", "text": "Opportunities don't exist here", "routesTo": "I17"},
            {"id": "R6", "text": "Golden-handcuffed", "routesTo": "I17"},
            {"id": "R7", "text": "Don't know what I want next", "routesTo": "I31"},
            {"id": "R8", "text": "I'm pigeonholed", "routesTo": "I29"}
        ]
    },
    {
        "id": "C5",
        "title": "I'm not motivated",
        "question": "What's missing?",
        "responses": [
            {"id": "R1", "text": "The meaning", "routesTo": "I5"},
            {"id": "R2", "text": "Growth opportunities", "routesTo": "I31"},
            {"id": "R3", "text": "Recognition", "routesTo": "I29"},
            {"id": "R4", "text": "Autonomy", "routesTo": "I1"},
            {"id": "R5", "text": "Connection with the work", "routesTo": "I5"},
            {"id": "R6", "text": "Energy", "routesTo": "I7"},
            {"id": "R7", "text": "Purpose", "routesTo": "I5"},
            {"id": "R8", "text": "Challenge", "routesTo": "I31"}
        ]
    },
    {
        "id": "C6",
        "title": "I'm dealing with conflict at work",
        "question": "What's at the heart of it?",
        "responses": [
            {"id": "R1", "text": "We want different things", "routesTo": "I12"},
            {"id": "R2", "text": "They don't trust me", "routesTo": "I26"},
            {"id": "R3", "text": "Communication styles clash", "routesTo": "I19"},
            {"id": "R4", "text": "Power imbalance", "routesTo": "I10"},
            {"id": "R5", "text": "Unspoken resentment", "routesTo": "I12"},
            {"id": "R6", "text": "Values misalignment", "routesTo": "I1"},
            {"id": "R7", "text": "They won't hear me", "routesTo": "I13"},
            {"id": "R8", "text": "I can't speak up safely", "routesTo": "I10"}
        ]
    },
    {
        "id": "C7",
        "title": "I'm struggling with change",
        "question": "What's hard about the change?",
        "responses": [
            {"id": "R1", "text": "No clarity on why", "routesTo": "I14"},
            {"id": "R2", "text": "No input in decisions", "routesTo": "I10"},
            {"id": "R3", "text": "Too many changes at once", "routesTo": "I14"},
            {"id": "R4", "text": "My skills may become obsolete", "routesTo": "I31"},
            {"id": "R5", "text": "Loss of what worked", "routesTo": "I14"},
            {"id": "R6", "text": "No support through transition", "routesTo": "I28"},
            {"id": "R7", "text": "Anxiety about uncertainty", "routesTo": "I18"},
            {"id": "R8", "text": "I'm exhausted from adapting", "routesTo": "I14"}
        ]
    },
    {
        "id": "C8",
        "title": "I'm having communication problems",
        "question": "Where's the disconnect?",
        "responses": [
            {"id": "R1", "text": "They're not saying what they mean", "routesTo": "I19"},
            {"id": "R2", "text": "I'm not being heard", "routesTo": "I13"},
            {"id": "R3", "text": "Too much left unsaid", "routesTo": "I12"},
            {"id": "R4", "text": "Feedback feels like attacks", "routesTo": "I22"},
            {"id": "R5", "text": "Passive-aggressive dynamics", "routesTo": "I12"},
            {"id": "R6", "text": "No shared understanding", "routesTo": "I19"},
            {"id": "R7", "text": "Trust has eroded", "routesTo": "I10"},
            {"id": "R8", "text": "Cultural/style differences", "routesTo": "I19"}
        ]
    },
    {
        "id": "C9",
        "title": "I feel overwhelmed",
        "question": "What's piling up?",
        "responses": [
            {"id": "R1", "text": "The sheer volume of work", "routesTo": "I1"},
            {"id": "R2", "text": "Too many interruptions", "routesTo": "I24"},
            {"id": "R3", "text": "Carrying others' stress", "routesTo": "I15"},
            {"id": "R4", "text": "Emotional labor of leadership", "routesTo": "I30"},
            {"id": "R5", "text": "No boundaries between work and life", "routesTo": "I21"},
            {"id": "R6", "text": "Perfectionism making everything take longer", "routesTo": "I20"},
            {"id": "R7", "text": "Decision fatigue", "routesTo": "I24"},
            {"id": "R8", "text": "Everything feels urgent", "routesTo": "I32"}
        ]
    },
    {
        "id": "C10",
        "title": "I'm angry at work",
        "question": "What's making you angry?",
        "responses": [
            {"id": "R1", "text": "Broken promises", "routesTo": "I10"},
            {"id": "R2", "text": "Unfair treatment", "routesTo": "I27"},
            {"id": "R3", "text": "Lack of control", "routesTo": "I16"},
            {"id": "R4", "text": "Being disrespected", "routesTo": "I28"},
            {"id": "R5", "text": "Values violation", "routesTo": "I1"},
            {"id": "R6", "text": "Watching dysfunction", "routesTo": "I10"},
            {"id": "R7", "text": "Boundary violations", "routesTo": "I16"},
            {"id": "R8", "text": "Gaslighting", "routesTo": "I10"}
        ]
    },
    {
        "id": "C11",
        "title": "I'm anxious",
        "question": "What are you worried about?",
        "responses": [
            {"id": "R1", "text": "Job security", "routesTo": "I31"},
            {"id": "R2", "text": "My performance", "routesTo": "I1"},
            {"id": "R3", "text": "What people think of me", "routesTo": "I29"},
            {"id": "R4", "text": "Making the wrong decision", "routesTo": "I18"},
            {"id": "R5", "text": "Letting people down", "routesTo": "I20"},
            {"id": "R6", "text": "The future is uncertain", "routesTo": "I18"},
            {"id": "R7", "text": "I'm not good enough", "routesTo": "I1"},
            {"id": "R8", "text": "Everything is changing too fast", "routesTo": "I14"}
        ]
    },
    {
        "id": "C12",
        "title": "I need to grow but don't know how",
        "question": "What kind of growth do you need?",
        "responses": [
            {"id": "R1", "text": "New skills", "routesTo": "I31"},
            {"id": "R2", "text": "Leadership development", "routesTo": "I32"},
            {"id": "R3", "text": "Visibility and influence", "routesTo": "I29"},
            {"id": "R4", "text": "Emotional intelligence", "routesTo": "I30"},
            {"id": "R5", "text": "Strategic thinking", "routesTo": "I32"},
            {"id": "R6", "text": "Communication skills", "routesTo": "I19"},
            {"id": "R7", "text": "Confidence", "routesTo": "I29"},
            {"id": "R8", "text": "Boundaries", "routesTo": "I21"}
        ]
    },
    {
        "id": "C13",
        "title": "Something is not working",
        "question": "What's broken?",
        "responses": [
            {"id": "R1", "text": "The process", "routesTo": "I10"},
            {"id": "R2", "text": "The team dynamics", "routesTo": "I15"},
            {"id": "R3", "text": "The leadership", "routesTo": "I28"},
            {"id": "R4", "text": "Communication", "routesTo": "I19"},
            {"id": "R5", "text": "The strategy", "routesTo": "I10"},
            {"id": "R6", "text": "The culture", "routesTo": "I23"},
            {"id": "R7", "text": "My role clarity", "routesTo": "I29"},
            {"id": "R8", "text": "The priorities", "routesTo": "I10"}
        ]
    },
    {
        "id": "C14",
        "title": "Leadership is harder than I expected",
        "question": "What's harder than you expected?",
        "responses": [
            {"id": "R1", "text": "Managing people's emotions", "routesTo": "I30"},
            {"id": "R2", "text": "Letting go of doing the work myself", "routesTo": "I32"},
            {"id": "R3", "text": "Making decisions with incomplete info", "routesTo": "I18"},
            {"id": "R4", "text": "Being vulnerable", "routesTo": "I25"},
            {"id": "R5", "text": "Setting boundaries while being available", "routesTo": "I21"},
            {"id": "R6", "text": "Having difficult conversations", "routesTo": "I12"},
            {"id": "R7", "text": "Modeling what I want to see", "routesTo": "I4"},
            {"id": "R8", "text": "The isolation", "routesTo": "I2"}
        ]
    },
    {
        "id": "C15",
        "title": "I don't know—pick for me",
        "question": "Let's see what resonates",
        "responses": []
    }
]

# Create complete dataset
complete_data = {
    "challenges": challenges,
    "insights": insights,
    "actions": actions,
    "restore": restore_cards,
    "metadata": {
        "version": "1.0",
        "created": "2025-11-26",
        "thread": 17,
        "scope": "Complete dataset - all 15 challenges, 32 insights, 32 actions, 20 restore cards",
        "totalChallenges": len(challenges),
        "totalInsights": len(insights),
        "totalActions": len(actions),
        "totalRestore": len(restore_cards),
        "sources": [
            "Burnout_Buddy_Complete_Routing_Map.md",
            "Burnout_Buddy_Insights_Complete_Final.md",
            "Burnout_Buddy_Actions_Draft_From_Insights.md",
            "Burnout_Buddy_Restore_Cards_Complete.md"
        ]
    }
}

# Write to file
with open('/home/claude/burnout-buddy/src/data/cards.json', 'w') as f:
    json.dump(complete_data, f, indent=2)

print(f"\nComplete dataset created:")
print(f"  - {len(challenges)} challenges")
print(f"  - {len(insights)} insights")
print(f"  - {len(actions)} actions")
print(f"  - {len(restore_cards)} restore cards")
print(f"\nSaved to: /home/claude/burnout-buddy/src/data/cards.json")
