#!/usr/bin/env bash
# =========================================================================
# Luz del Corán / Light of the Quran - Fast Deployment Helper
# =========================================================================

echo "======================================================"
echo "🌙 Luz del Corán / Light of the Quran - Deploy Helper"
echo "======================================================"
echo ""
echo "Select your deployment method:"
echo "1) Netlify (Recommended - Simplest & Fastest)"
echo "2) Vercel"
echo "3) GitHub Pages"
echo ""
read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        echo ""
        echo "🚀 Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod --dir=.
        else
            echo "Opening Netlify Drop in your default browser..."
            echo "👉 Simply drag and drop this 'Quran website' folder onto the webpage!"
            open "https://app.netlify.com/drop" 2>/dev/null || xdg-open "https://app.netlify.com/drop" 2>/dev/null
        fi
        ;;
    2)
        echo ""
        echo "🚀 Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "Opening Vercel New Project in your browser..."
            open "https://vercel.com/new" 2>/dev/null || xdg-open "https://vercel.com/new" 2>/dev/null
        fi
        ;;
    3)
        echo ""
        echo "Pushing latest commits to GitHub..."
        git status
        echo "Make sure your GitHub remote is set: git remote add origin <your-repo-url>"
        ;;
    *)
        echo "Invalid selection."
        ;;
esac
