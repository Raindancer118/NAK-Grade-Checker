package main

import (
	"bytes"
	"fmt"
	"log"
	"regexp"
	"strings"

	"github.com/ledongthuc/pdf"
)

type Grade struct {
	Module          string
	Grade           string
	OccurrenceIndex int
}

func main() {
	content, err := readPdf("grades.pdf")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("--- START PDF CONTENT ---")
	fmt.Println(content)
	fmt.Println("--- END PDF CONTENT ---")

	grades := extractGrades(content)
	fmt.Printf("Found %d grades:\n", len(grades))
	for _, g := range grades {
		fmt.Printf("Module: %s | Grade: %s | Index: %d\n", g.Module, g.Grade, g.OccurrenceIndex)
	}
}

func readPdf(path string) (string, error) {
	f, r, err := pdf.Open(path)
	if err != nil {
		return "", err
	}
	defer f.Close()

	var buf bytes.Buffer
	b, err := r.GetPlainText()
	if err != nil {
		return "", err
	}
	buf.ReadFrom(b)
	return buf.String(), nil
}

func extractGrades(text string) []Grade {
	var grades []Grade
	lines := strings.Split(text, "\n")

	// Clean lines
	var cleanLines []string
	for _, l := range lines {
		l = strings.TrimSpace(l)
		if l != "" {
			cleanLines = append(cleanLines, l)
		}
	}

	// Regex for Module ID (e.g., I169)
	reID := regexp.MustCompile(`^I\d+$`)

	var currentModuleID string
	var currentModuleName string
	var currentGradeParts []string

	// Track occurrences of each module to handle retakes
	moduleOccurrences := make(map[string]int)

	for i := 0; i < len(cleanLines); i++ {
		line := cleanLines[i]

		if reID.MatchString(line) {
			// Save previous module if exists
			if currentModuleID != "" {
				gradeStr := strings.Join(currentGradeParts, " ")
				if gradeStr == "" {
					gradeStr = "?" // Should not happen usually
				}

				// Calculate occurrence index
				idx := moduleOccurrences[currentModuleName]
				moduleOccurrences[currentModuleName]++

				grades = append(grades, Grade{
					Module:          currentModuleName,
					Grade:           gradeStr,
					OccurrenceIndex: idx,
				})
			}

			// Start new module
			currentModuleID = line
			if i+1 < len(cleanLines) {
				currentModuleName = cleanLines[i+1]
				i++ // Skip name line
			} else {
				currentModuleName = "Unknown"
			}
			currentGradeParts = []string{}
		} else {
			// Collecting grade info
			// Skip CP lines
			if strings.HasSuffix(line, " CP") || line == "Credits" {
				continue
			}
			// Skip other potential headers if they appear (heuristic)
			if line == "Note" || line == "Name" || line == "ModulNr" {
				continue
			}

			// Stop if we hit the footer
			if strings.HasPrefix(line, "Diese Notenübersicht ist kein Zeugnis") ||
				strings.HasPrefix(line, "Der derzeitige Notendurchschnitt") {
				break
			}

			// Append to grade
			if currentModuleID != "" {
				currentGradeParts = append(currentGradeParts, line)
			}
		}
	}

	// Add last module
	if currentModuleID != "" {
		gradeStr := strings.Join(currentGradeParts, " ")

		idx := moduleOccurrences[currentModuleName]
		moduleOccurrences[currentModuleName]++

		grades = append(grades, Grade{
			Module:          currentModuleName,
			Grade:           gradeStr,
			OccurrenceIndex: idx,
		})
	}

	return grades
}
