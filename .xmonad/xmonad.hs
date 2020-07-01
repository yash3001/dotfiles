-------------------------------------------------------
-- IMPORTS
-------------------------------------------------------

import XMonad
import XMonad.ManageHook
import XMonad.Config.Desktop
import Data.Monoid
import System.Exit
import Graphics.X11.ExtraTypes.XF86
import qualified XMonad.StackSet as W
import qualified Data.Map        as M

-- Util
import XMonad.Util.SpawnOnce
import XMonad.Util.Run
import XMonad.Util.EZConfig
import XMonad.Util.NamedScratchpad

-- Actions
import XMonad.Actions.WithAll (sinkAll, killAll)

-- Hooks
import XMonad.Hooks.ManageDocks
import XMonad.Hooks.DynamicLog
import XMonad.Hooks.FadeInactive
import XMonad.Hooks.EwmhDesktops -- to show workspaces in application switchers
import XMonad.Hooks.ManageHelpers (isFullscreen, isDialog,  doFullFloat, doCenterFloat, doRectFloat) 
import XMonad.Hooks.Place (placeHook, withGaps, smart)
import XMonad.Hooks.UrgencyHook
import XMonad.Hooks.WorkspaceHistory

-- Layout
import XMonad.Layout.Spacing
import XMonad.Layout.NoBorders
import XMonad.Layout.Named

-------------------------------------------------------
-- CONFIG
-------------------------------------------------------

myModMask = mod4Mask
myTerminal = "terminator"
myBorderWidth = 1
myNormalBorderColor = "#004c99" 
myFocusedBorderColor = "#dddddd" 
myFocusFollowsMouse = True
myClickJustFocuses = False
--myWorkspaces = ["1","2","3","4","5","6","7","8","9"]
xmobarEscape = concatMap doubleLts
  where doubleLts '<' = "<<"
        doubleLts x   = [x]
myWorkspaces :: [String]
myWorkspaces = clickable . (map xmobarEscape) $ ["1:web","2:term","3:code","4:file","5:edit","6","7","8","9"]
  where
         clickable l = [ "<action=xdotool key super+" ++ show (n) ++ ">" ++ ws ++ "</action>" |
                             (i,ws) <- zip [1..9] l,
                            let n = i ]
-------------------------------------------------------
-- STARTUP HOOK
-------------------------------------------------------

myStartupHook = do
        spawnOnce "xfce4-power-manager &"
        spawnOnce "nitrogen --restore &"
        spawnOnce "compton &"
        spawnOnce "xinput set-prop 'SynPS/2 Synaptics TouchPad' 'libinput Tapping Enabled' 1"
        spawnOnce "trayer --edge top --align right --widthtype percent --width 1% --heighttype request --height 20%  --distancefrom right --distance 2 --transparent true --alpha 0  --tint 0x282a36"
        spawnOnce "nm-applet &"

-------------------------------------------------------
-- LAYOUT
-------------------------------------------------------

myLayout = avoidStruts( tiled ) ||| noBorders Full -- Add ' ||| Mirror tilled ' if you want
  where
     tiled   = smartSpacing 5 $ Tall nmaster delta ratio -- default tiling algorithm partitions the screen into two panes 
     nmaster = 1 -- The default number of windows in the master pane 
     ratio   = 1/2 -- Default proportion of screen occupied by master pane
     delta   = 3/100 -- Percent of screen to increment by when resizing panes
 
-------------------------------------------------------
-- WINDOW RULES
-------------------------------------------------------

myManageHook = composeAll
    [ 
      className =? "Firefox"            --> doShift (myWorkspaces !! 0)   -- It will shift to 'num' + 1 like 0+1 = 1 so on 1 workspace.
    , className =? "Transmission-gtk"   --> doShift (myWorkspaces !! 5)
    , className =? "Transmission-gtk"   --> doFloat
    , className =? "MPlayer"            --> doFloat
    , className =? "Gimp"               --> doFloat
    , resource  =? "desktop_window"     --> doIgnore
    , resource  =? "kdesktop"           --> doIgnore ] <+> namedScratchpadManageHook myScratchPads 


-------------------------------------------------------
-- EVENT HANDELING
-------------------------------------------------------

myEventHook = mempty

-------------------------------------------------------
-- STATUS BAR AND LOGGING
-------------------------------------------------------

-- Sets opacity for inactive (unfocused) windows. Set
-- this to a value of less than 1 (such as 0.9 for 90% opacity).
myLogHook :: X ()
myLogHook = fadeInactiveLogHook fadeAmount
    where fadeAmount = 1


-------------------------------------------------------
-- Scratchpads
-------------------------------------------------------

myScratchPads :: [NamedScratchpad]
myScratchPads = [ NS "terminal" spawnTerm findTerm manageTerm
                , NS "mocp" spawnMocp findMocp manageMocp
                ]
  where
    spawnTerm  = myTerminal 
    findTerm   = resource =? "scratchpad"
    manageTerm = customFloating $ W.RationalRect l t w h
               where
                 h = 0.9
                 w = 0.9
                 t = 0.95 -h
                 l = 0.95 -w
    spawnMocp  = myTerminal ++ "-e 'mocp'"
    findMocp   = resource =? "mocp"
    manageMocp = customFloating $ W.RationalRect l t w h
               where
                 h = 0.9
                 w = 0.9
                 t = 0.95 -h
                 l = 0.95 -w


-------------------------------------------------------
-- KEY BINDINGS
-------------------------------------------------------

myKeys conf@(XConfig {XMonad.modMask = modm}) = M.fromList $

    [((m .|. modm, k), windows $ f i)
        | (i, k) <- zip (XMonad.workspaces conf) [xK_1 .. xK_9]
        , (f, m) <- [(W.greedyView, 0), (W.shift, shiftMask)]]


-- Mouse bindings: default actions bound to mouse events
--myMouseBindings (XConfig {XMonad.modMask = modm}) = M.fromList $
--
--    -- mod-button1, Set the window to floating mode and move by dragging
--    [ ((modm, button1), (\w -> focus w >> mouseMoveWindow w
--                                       >> windows W.shiftMaster))
--
--    -- mod-button2, Raise the window to the top of the stack
--    , ((modm, button2), (\w -> focus w >> windows W.shiftMaster))
--
--    -- mod-button3, Set the window to floating mode and resize by dragging
--    , ((modm, button3), (\w -> focus w >> mouseResizeWindow w
--                                       >> windows W.shiftMaster))
--
--    -- you may also bind events to the mouse scroll wheel (button4 and button5)
--    ]

mykeys =

    -- Xmonad
        [ ("M-S-r", spawn "xmonad --recompile; xmonad --restart")       -- Recompiles and Restarts Xmonad
        , ("M-S-e", spawn "terminator -e 'vim ~/.xmonad/xmonad.hs'")    -- Edit Xmonad config 
        , ("M-S-s", io (exitWith ExitSuccess))                          -- Quit Xmonad 
    
    -- launch my Terminal
        , ("M-<Return>", spawn myTerminal)                              -- Launch Terminator (my terminal of choice)

    -- Windows Navigation
        , ("M-j", windows W.focusDown)                                  -- Move focus to the next window
        , ("M-k", windows W.focusUp)                                    -- Move focus to the previous window 
        , ("M-<Right>", windows W.focusDown)                            -- Move focus to the next window
        , ("M-<Left>", windows W.focusUp)                               -- Move focus to the previous window 
        , ("M-m", windows W.focusMaster)                                -- Move focus to the master window 
        , ("M-S-<Return>", windows W.swapMaster)                        -- Swap the focused window and the master window
        , ("M-S-j", windows W.swapDown)                                 -- Swap the focused window with the next window 
        , ("M-S-k", windows W.swapUp)                                   -- Swap the focused window with the previous window
        , ("M-S-<Right>", windows W.swapDown)                           -- Swap the focused window with the next window 
        , ("M-S-<Left>", windows W.swapUp)                              -- Swap the focused window with the previous window

    -- Window Actions
        , ("M-q", kill)                                                 -- Kill focused window
        , ("M-S-q", killAll)                                            -- Kill all windows on current workspace

    -- Layout
        , ("M-<Space>", sendMessage NextLayout)                         -- Rotate through the available layout algorithms
        , ("M-n", refresh)                                              -- Resize viewed windows to the correct size
        , ("M-h", sendMessage Shrink)                                   -- Shrink the master area
        , ("M-l", sendMessage Expand)                                   -- Expand the master area
        , ("M-t", withFocused $ windows . W.sink)                       -- Push window back into tiling
        , ("M-,", sendMessage (IncMasterN 1))                           -- Increment the number of windows in the master area 
        , ("M-.", sendMessage (IncMasterN (-1)))                        -- Deincrement the number of windows in the master area 

    -- Named Scratchpads
    , ("M-C-<Return>", namedScratchpadAction myScratchPads "terminal")  -- Open terminal as a scratchpad

    -- My Applications (super + alt + key)
        , ("M-M1-b", spawn "firefox")                                                                  -- Launch Firefox
        , ("M-M1-x", spawn "dmenu_run -i -fn 'Monospace' -nf '#F4800d' -sb '#f4800d' -sf '#1e1e1e'")   -- Launch dmenu

    -- Multimedia Keys
        , ("<XF86AudioMute>", spawn "amixer -q -D pulse set Master 1+ toggle")      -- Mute volume 
        , ("<XF86AudioLowerVolume>", spawn "amixer -q set Master 5%-")              -- Decrease volume
        , ("<XF86AudioRaiseVolume>", spawn "amixer -q set Master 5%+")              -- Increase volume
        , ("<XF86MonBrightnessUp>", spawn "/home/yash/.xmonad/brightness.sh +2")    -- Increase brightness by 2 
        , ("<XF86MonBrightnessDown>", spawn "/home/yash/.xmonad/brightness.sh -2")  -- Descrease brightness by 2
    
    -- System
        , ("M-S-l", spawn "i3lock-fancy")                               -- Lock Screen
        ]
-------------------------------------------------------
-- MAIN
-------------------------------------------------------

main = do
  xmproc <- spawnPipe "xmobar /home/yash/.config/xmobar/xmobarrc"
  xmonad $ docks def {
      -- simple stuff
        terminal           = myTerminal,
        focusFollowsMouse  = myFocusFollowsMouse,
        clickJustFocuses   = myClickJustFocuses,
        borderWidth        = myBorderWidth,
        modMask            = myModMask,
        workspaces         = myWorkspaces,
        normalBorderColor  = myNormalBorderColor,
        focusedBorderColor = myFocusedBorderColor,

      -- key bindings
        keys               = myKeys,
        --mouseBindings      = myMouseBindings,

      -- hooks, layouts
        layoutHook         = myLayout,
        manageHook         = myManageHook,
        handleEventHook    = myEventHook,
        startupHook        = myStartupHook,
        logHook            = workspaceHistoryHook <+> myLogHook <+> dynamicLogWithPP xmobarPP
                                 { ppOutput = hPutStrLn xmproc 
                                 , ppCurrent = xmobarColor "#c3e88d" "" . wrap "[" "]"      -- Current workspace in xmobar
                                 , ppVisible = xmobarColor "#c3e88d" ""                     -- Visible but not current workspace
                                 , ppHidden = xmobarColor "#82AAFF" "" . wrap "*" ""        -- Hidden workspaces in xmobar
                                 --, ppHiddenNoWindows = xmobarColor "#F07178" ""           -- Hidden workspaces (no windows)
                                 , ppHiddenNoWindows= \( _ ) -> ""                          -- Only shows visible workspaces. Useful for TreeSelect.
                                 , ppTitle = xmobarColor "#d0d0d0" "" . shorten 60          -- Title of active window in xmobar
                                 , ppSep =  "<fc=#666666> | </fc>"                          -- Separators in xmobar
                                 --, ppUrgent = xmobarColor "#C45500" "" . wrap "!" "!"     -- Urgent workspace
                                 --, ppExtras  = [windowCount]                              -- # of windows current workspace
                                 , ppOrder  = \(ws:l:t:ex) -> [ws]++ex++[t]                 -- Original: ppOrder = \(ws:l:t:ex) -> [ws:l]++ex++[t]
                                 }

    }`additionalKeysP` mykeys 
