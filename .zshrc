neofetch
# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="/home/yash/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="powerlevel10k/powerlevel10k"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to automatically update without prompting.
# DISABLE_UPDATE_PROMPT="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git vi-mode zsh-syntax-highlighting zsh-autosuggestions zsh-vim-mode command-not-found)

# Autosuggestion configuration
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=8,bold,underline"

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# echo ""
# pfetch
#fortune | cowsay -f tux
# colorscript random
# neofetch

#Aliases

# to stop me from fucking myself
alias mv="mv -i"
alias cp="cp -i"

# listing (install exa first)
alias ls="lsd -l"
alias la="lsd -la"

# skipping sudo while installing
alias pacman="sudo pacman"
#alias i="sudo pacman -S"

# changing and making directories.
alias ..="cd .."
alias cdd="cd ~/Desktop/"
alias mkdir="mkdir -pv"

# for colourfull output (install  colordiff package )
alias diff="colordiff"

# editing with nvim
alias edit="nvim"
alias vi="nvim"
alias vim="nvim"

# alias for git push (Because I am lazy)
alias push="git add . && git commit -am 'auto-push' && git push"
alias cppush="git add . && git commit -am 'added code' && git push"

#For clearing and adding a new line after that
#alias clear='clear && echo ""'

#lolz
alias :q="exit"

#dmenu center alias
alias dmenu_run="dmenu_run -h 40 -c -l 10"
alias dmenu="dmenu -c -h 40"

# zsh-vim-mode plugin
KEYTIMEOUT=1
MODE_CURSOR_VIINS="#ffffff blinking bar"
MODE_CURSOR_REPLACE="#ff0000 blinking block"
MODE_CURSOR_VICMD="#ffffff block"
MODE_CURSOR_SEARCH="#ff00ff steady underline"
MODE_CURSOR_VISUAL="green steady block"
MODE_CURSOR_VLINE="$MODE_CURSOR_VISUAL #00ffff"

# Search backward in history after typing the first character
#bindkey "^[[A" history-beginning-search-backward
#bindkey "^[[B" history-beginning-search-forward

PATH=$PATH:/home/yash/Desktop/.desktop/automate
PATH=$PATH:/home/yash/.local/bin
PATH=$PATH:/home/yash/.local/lib/python3.8/site-packages
PATH=$PATH:/home/yash/anaconda3/bin

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/home/yash/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/home/yash/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/home/yash/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/home/yash/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

