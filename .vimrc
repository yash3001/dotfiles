" Setting the mapleader
let mapleader = " "

" Enabling syntax highlighting
syntax on

" Enabling relative line numbers
set relativenumber
set nu rnu

" Highlighting line numbers (if not using a theme)
highlight LineNr term=bold ctermfg=DarkGrey guifg=DarkGrey

" Enabling the cursor line highlighting
set cursorline
highlight cursorline cterm=none

" Setting tab to 4 spaces
set tabstop=4 softtabstop=4
set shiftwidth=4

" Expanding tab to 4 spaces
set expandtab

" Enabling autoindentaion
set autoindent

" Disabling line wraping when word exceed line length
set nowrap

" Dont know what this does
set linebreak

" Searching case insenitive
set ignorecase
set smartcase

" Incremental search
set incsearch

" Dont know
set showcmd

" Eliminate delay on pressing esc when using powerline/airline
set timeoutlen=1000 ttimeoutlen=0

" Setting up undo directory
set undodir=~/.vim/undodir
set undofile

" Enabling mouse usage
set mouse=a

" Disabling the swapfile creation
set noswapfile

" Giving a title to vim window
set title

" Enabling the cursor line highlighting
set cursorline
highlight cursorline cterm=none

"Plugins
"Usage----->
    "Type :PlugInstall to install any new plugins
    "Type :PlugUpdate to update any plugins
    "Type :PlugClean to uninstall any unused plugin
    "Type :PlugUpgrade to upgrade Plug itself
    "Type :PlugStatus to check the status of the plugins
call plug#begin('~/.vim/plugged')

Plug 'morhetz/gruvbox'
Plug 'mbbill/undotree'
Plug 'preservim/nerdtree'
Plug 'jiangmiao/auto-pairs'
Plug 'vimwiki/vimwiki'
Plug 'preservim/nerdcommenter'
Plug 'mattn/emmet-vim'
Plug 'chrisbra/Colorizer'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'

call plug#end()




"Gruvbox
"
colorscheme gruvbox
set background=dark




" Airline
"
"let g:airline_theme='dark'
let g:airline_theme='bubblegum'
let g:airline_powerline_fonts = 1







"Undotree
"
"1) To get the undo tree, type <space>+u
"2) To select any undo number, hover over it and press enter
nnoremap <leader>u :UndotreeShow<CR>




" Emmet-vim (For front end)
"
" 1) To get the dummy html text, type html:5 then press ,,
" <!DOCTYPE html>
" <html lang="en">
" <head>
    " <meta charset="UTF-8">
    " <title></title>
" </head>
" <body>

" </body>
" </html>

" 2) To autocomplete tags, type the tag like div then press ,,

" 3) We can use nested tag expansion by typing any tags like div1>div2>div3 then preesing ,, (Make sure you dont have space after writing the expression)
" <div1>
    " <div2>
        " <div3></div3>
    " </div2>
" </div1>

" 4) div#mylist>li*10>{yo} then pressing ,, would create this:
" <div id="mylist">
    " <li>yo</li>
    " <li>yo</li>
    " <li>yo</li>
    " <li>yo</li>
    " <li>yo</li>
    " <li>yo</li>
    " <li>yo</li>
    " <li>yo</li>
    " <li>yo</li>
    " <li>yo</li>
" </div>

" 5) Using > will create tags inside the parent tag Ex. div1>div2 here div1
" is the parent. So if we want to create sibling tags, we use +.
" Ex. div1+h1+h2 then ,, would create:
" <div1></div1>                                                          
" <h1></h1>
" <h2></h2> 

" 6) There are various shortcuts for tags like:
" blockquote - bq
" button - btn
" footer - ftr

" 7) Id expansion can be done using #. Eg, tag#id_name ,, would do:
" <tag id="id_name"></tag>  (already shown above)

" 8) Similarly for class expansion we would use . instead of # (To provide more
" classes, simply keep adding classes . after . like .class1.class2).

" 9) If no tag is provided before # or . then the default tag is <div>

" 10) We can combine both id and class expansion

" 11) Add content to tags using {}, like h1{text here} then ,,

" more available at https://docs.emmet.io/cheat-sheet/
let g:user_emmet_mode='n'    "Only work in normal mode
let g:user_emmet_leader_key=','




" Nerd commentary
"
" 1) <leader>cc         -- Comment out the current line or text selected in visual mode.
" 2) <leader>cu         -- Uncomments the selected line(s).
" 3) <leader>ci         -- Toggles(changes) the comment state of the selected line(s) individually.
" 4) <leader>cA         -- Adds comment delimiters(symbol) to the end of line and goes into insert mode between them.
" 5) <leader>c$         -- Comments the current line from the cursor to the end of line.
" 6) <leader>c<space>   -- Toggles the comment state of the selected line(s). If the topmost selected line is commented, all selected lines are uncommented and vice versa.
" 7) <leader>cs         -- Comments out the selected lines with a pretty block formatted layout. 
" 8) <leader>cy         -- Same as cc except that the commented line(s) are yanked first.
let g:NERDSpaceDelims = 1 " To provide space after comment
let g:NERDCompactSexyComs = 1 " Comments out the selected lines with a pretty block formatted layout.




" Colorizer
"
" 1) :ColorHighlight    -- Highlights hex colours
" 2) :ColorClear        -- Clears the highlighting




" NERDTree
"
" Automatically open nerdtree if vim is not opened with a directory
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 1 && !isdirectory(argv()[0]) && !exists("s:std_in") | exe 'NERDTree' argv()[0] | wincmd l |endif
autocmd VimEnter * if argc() == 1 && !isdirectory(argv()[0]) | exe 'NERDTree' | wincmd l | endif
autocmd VimEnter * if argc() == 0 | exe 'NERDTree' | wincmd l |endif
" Autmatically close Nerdtree with vim
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif




" General Mappings (<CR> for enter)
nnoremap <leader><Left> :wincmd h<CR>
nnoremap <leader><Down> :wincmd j<CR>
nnoremap <leader><Up> :wincmd k<CR>
nnoremap <leader><Right> :wincmd l<CR>
nnoremap <leader>h :wincmd h<CR>
nnoremap <leader>j :wincmd j<CR>
nnoremap <leader>k :wincmd k<CR>
nnoremap <leader>l :wincmd l<CR>
nnoremap <C-d> :sh<CR>
nnoremap <leader>n o<C-c>cc<C-c>
inoremap jj <C-c>

" For Terminal only.
" nnoremap <C-h> <C-w>h
" nnoremap <C-j> <C-w>j
" nnoremap <C-k> <C-w>k
" nnoremap <C-l> <C-w>l

" To open terminal horizontally below.
nnoremap <leader>t :below terminal<CR>
nnoremap <leader>vt :below vertical terminal<CR>

" To open directories in vim in vertical mode and also resize it.
"nnoremap <leader>vd :wincmd v<bar> :Ex <bar> :vertical resize 30<CR>  

" NERDTree
nnoremap <leader>vd :NERDTreeToggle<CR>

" Copy pasting from clipboard.
map <C-y> "+y
map <C-p> "+p
map <C-P> "+P

" Change cursor shape based upon the mode
" Ps = 0  -> blinking block.
" Ps = 1  -> blinking block (default).
" Ps = 2  -> steady block.
" Ps = 3  -> blinking underline.
" Ps = 4  -> steady underline.
" Ps = 5  -> blinking bar (xterm).
" Ps = 6  -> steady bar (xterm).
let &t_SI = "\e[5 q"
let &t_EI = "\e[0 q"
let &t_SR = "\e[3 q"
