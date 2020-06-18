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
set mouse=a

"Plugins
call plug#begin('~/.vim/plugged')

Plug 'morhetz/gruvbox'
Plug 'git@github.com:Valloric/YouCompleteMe.git'
Plug 'mbbill/undotree'

call plug#end()

colorscheme gruvbox
set background=dark


"Mappings
let mapleader = " "

nnoremap <leader><Left> :wincmd h<CR>
nnoremap <leader><Down> :wincmd j<CR>
nnoremap <leader><Up> :wincmd k<CR>
nnoremap <leader><Right> :wincmd l<CR>
nnoremap <leader>h :wincmd h<CR>
nnoremap <leader>j :wincmd j<CR>
nnoremap <leader>k :wincmd k<CR>
nnoremap <leader>l :wincmd l<CR>
nnoremap <leader>u :UndotreeShow<CR>

"For Terminal only.
"nnoremap <C-h> <C-w>h
"nnoremap <C-j> <C-w>j
"nnoremap <C-k> <C-w>k
"nnoremap <C-l> <C-w>l

"To open terminal horizontally below.
nnoremap <leader>t :below terminal<CR>
nnoremap <leader>vt :below vertical terminal<CR>

"To open directories in vim in vertical mode and also resize it.
nnoremap <leader>vd :wincmd v<bar> :Ex <bar> :vertical resize 30<CR>  

"Copy pasting from clipboard.
map <C-c> "+y
map <C-v> "+p
