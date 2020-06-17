syntax on
set relativenumber
set nu rnu
highlight LineNr term=bold ctermfg=DarkGrey guifg=DarkGrey 
set tabstop=4 softtabstop=4
set autoindent
set shiftwidth=4
set expandtab
set wrap
set linebreak
set ignorecase
set smartcase
set incsearch
set showcmd
set undodir=~/.vim/undodir
set undofile
set noswapfile
set title
set cursorline
highlight cursorline cterm=none

call plug#begin('~/.vim/plugged')

Plug 'morhetz/gruvbox'
Plug 'git@github.com:Valloric/YouCompleteMe.git'
Plug 'mbbill/undotree'

call plug#end()

colorscheme gruvbox
set background=dark

let mapleader = " "

nnoremap <leader>u :UndotreeShow<CR>
nnoremap <leader>pv :wincmd v<bar> :Ex <bar> :vertical resize 30<CR>
