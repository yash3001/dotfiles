-------------------------------------------------------
-- IMPORTS
-------------------------------------------------------

import XMonad
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

-- Hooks
import XMonad.Hooks.ManageDocks

-- Layout
import XMonad.Layout.Spacing
import XMonad.Layout.NoBorders

-------------------------------------------------------
-- CONFIG
-------------------------------------------------------

myModMask = mod4Mask
myTerminal = "terminator"
myBorderWidth = 1
myNormalBorderColor = "#dddddd"
myFocusedBorderColor = "#004c99"
myFocusFollowsMouse = True
myClickJustFocuses = False
myWorkspaces = ["1","2","3","4","5","6","7","8","9"]

-------------------------------------------------------
-- STARTUP HOOK
-------------------------------------------------------

myStartupHook = do
        spawnOnce "xfce4-power-manager &"
        spawnOnce "nitrogen --restore &"
        spawnOnce "compton &"
        spawnOnce "xinput set-prop 'SynPS/2 Synaptics TouchPad' 'libinput Tapping Enabled' 1"

-------------------------------------------------------
-- LAYOUT
-------------------------------------------------------

myLayout = avoidStruts( tiled ) ||| Full -- Add ' ||| Mirror tilled ' if you want
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
      className =? "Firefox"            --> doShift "1"
    , className =? "Transmission-gtk"   --> doShift "6"
    , className =? "MPlayer"            --> doFloat
    , className =? "Gimp"               --> doFloat
    , resource  =? "desktop_window"     --> doIgnore
    , resource  =? "kdesktop"           --> doIgnore ]


-------------------------------------------------------
-- EVENT HANDELING
-------------------------------------------------------

myEventHook = mempty

-------------------------------------------------------
-- STATUS BAR AND LOGGING
-------------------------------------------------------

myLogHook = return ()

-------------------------------------------------------
-- KEY BINDINGS
-------------------------------------------------------

myKeys conf@(XConfig {XMonad.modMask = modm}) = M.fromList $

    -- launch a terminal
    [ ((modm,               xK_Return), spawn $ XMonad.terminal conf)

    -- launch dmenu
    , ((modm,               xK_x     ), spawn "dmenu_run -i -fn 'Monospace' -nf '#F4800d' -sb '#f4800d' -sf '#1e1e1e'")

    -- launch gmrun
    --, ((modm .|. shiftMask, xK_p     ), spawn "gmrun")

    -- launch firefox
    , ((modm,               xK_b     ), spawn "firefox")

    -- mute volume
    , ((0,      xF86XK_AudioMute     ), spawn "amixer -q -D pulse set Master 1+ toggle")

    -- decrease volume
    , ((0, xF86XK_AudioLowerVolume   ), spawn "amixer -q set Master 5%-")

    -- mute volume
    , ((0, xF86XK_AudioRaiseVolume   ), spawn "amixer -q set Master 5%+")

    -- close focused window
    , ((modm,               xK_q     ), kill)

     -- Rotate through the available layout algorithms
    , ((modm,               xK_space ), sendMessage NextLayout)

    --  Reset the layouts on the current workspace to default
    , ((modm .|. shiftMask, xK_space ), setLayout $ XMonad.layoutHook conf)

    -- Resize viewed windows to the correct size
    , ((modm,               xK_n     ), refresh)

    -- Move focus to the next window
    , ((modm,               xK_Tab   ), windows W.focusDown)

    -- Move focus to the next window
    , ((modm,               xK_j     ), windows W.focusDown)

    -- Move focus to the previous window
    , ((modm,               xK_k     ), windows W.focusUp  )

    -- Move focus to the master window
    , ((modm,               xK_m     ), windows W.focusMaster  )

    -- Swap the focused window and the master window
    , ((modm .|. shiftMask, xK_Return), windows W.swapMaster)

    -- Swap the focused window with the next window
    , ((modm .|. shiftMask, xK_j     ), windows W.swapDown  )

    -- Swap the focused window with the previous window
    , ((modm .|. shiftMask, xK_k     ), windows W.swapUp    )

    -- Shrink the master area
    , ((modm,               xK_h     ), sendMessage Shrink)

    -- Expand the master area
    , ((modm,               xK_l     ), sendMessage Expand)

    -- Push window back into tiling
    , ((modm,               xK_t     ), withFocused $ windows . W.sink)

    -- Increment the number of windows in the master area
    , ((modm              , xK_comma ), sendMessage (IncMasterN 1))

    -- Deincrement the number of windows in the master area
    , ((modm              , xK_period), sendMessage (IncMasterN (-1)))

    -- Toggle the status bar gap
    -- Use this binding with avoidStruts from Hooks.ManageDocks.
    -- See also the statusBar function from Hooks.DynamicLog.
    --
    -- , ((modm              , xK_b     ), sendMessage ToggleStruts)

    -- Quit xmonad
    , ((modm .|. shiftMask, xK_q     ), io (exitWith ExitSuccess))

    -- Lock screen
    , ((modm .|. shiftMask, xK_l     ), spawn "i3lock-fancy")

    -- Restart xmonad
    , ((modm,               xK_r     ), spawn "xmonad --recompile; xmonad --restart")

    -- Run xmessage with a summary of the default keybindings (useful for beginners)
    , ((modm .|. shiftMask, xK_slash ), spawn ("echo \"" ++ help ++ "\" | xmessage -file -"))
    ]
    ++

    [((m .|. modm, k), windows $ f i)
        | (i, k) <- zip (XMonad.workspaces conf) [xK_1 .. xK_9]
        , (f, m) <- [(W.greedyView, 0), (W.shift, shiftMask)]]

------------------------------------------------------------------------
-- Mouse bindings: default actions bound to mouse events
--
myMouseBindings (XConfig {XMonad.modMask = modm}) = M.fromList $

    -- mod-button1, Set the window to floating mode and move by dragging
    [ ((modm, button1), (\w -> focus w >> mouseMoveWindow w
                                       >> windows W.shiftMaster))

    -- mod-button2, Raise the window to the top of the stack
    , ((modm, button2), (\w -> focus w >> windows W.shiftMaster))

    -- mod-button3, Set the window to floating mode and resize by dragging
    , ((modm, button3), (\w -> focus w >> mouseResizeWindow w
                                       >> windows W.shiftMaster))

    -- you may also bind events to the mouse scroll wheel (button4 and button5)
    ]


-------------------------------------------------------
-- MAIN
-------------------------------------------------------

main = do
  xmproc <- spawnPipe "xmobar /home/yash/.config/xmobar/xmobarrc"
  xmonad $ docks defaults

defaults = def {
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
        mouseBindings      = myMouseBindings,

      -- hooks, layouts
        layoutHook         = myLayout,
        manageHook         = myManageHook,
        handleEventHook    = myEventHook,
        logHook            = myLogHook,
        startupHook        = myStartupHook
    }

-------------------------------------------------------
-- HELP MENU
-------------------------------------------------------

help :: String
help = unlines ["The default modifier key is 'Super'. Default keybindings:",
    "",
    "-- launching and killing programs",
    "mod-Enter        Launch terminator",
    "mod-x            Launch dmenu",
    "mod-b            Launch firefox",
    "mod-q            Close/kill the focused window",
    "mod-Space        Rotate through the available layout algorithms",
    "mod-Shift-Space  Reset the layouts on the current workSpace to default",
    "mod-n            Resize/refresh viewed windows to the correct size",
    "",
    "-- move focus up or down the window stack",
    "mod-Tab        Move focus to the next window",
    "mod-Shift-Tab  Move focus to the previous window",
    "mod-j          Move focus to the next window",
    "mod-k          Move focus to the previous window",
    "mod-m          Move focus to the master window",
    "",
    "-- modifying the window order",
    "mod-Shift-Enter   Swap the focused window and the master window",
    "mod-Shift-j  Swap the focused window with the next window",
    "mod-Shift-k  Swap the focused window with the previous window",
    "",
    "-- resizing the master/slave ratio",
    "mod-h  Shrink the master area",
    "mod-l  Expand the master area",
    "",
    "-- floating layer support",
    "mod-t  Push window back into tiling; unfloat and re-tile it",
    "",
    "-- increase or decrease number of windows in the master area",
    "mod-comma  (mod-,)   Increment the number of windows in the master area",
    "mod-period (mod-.)   Deincrement the number of windows in the master area",
    "",
    "-- quit, or restart",
    "mod-Shift-q  Quit xmonad",
    "mod-r        Restart xmonad",
    "mod-[1..9]   Switch to workSpace N",
    "",
    "-- Workspaces & screens",
    "mod-Shift-[1..9]   Move client to workspace N",
    "mod-{w,e,r}        Switch to physical/Xinerama screens 1, 2, or 3",
    "mod-Shift-{w,e,r}  Move client to screen 1, 2, or 3",
    "",
    "-- Mouse bindings: default actions bound to mouse events",
    "mod-button1  Set the window to floating mode and move by dragging",
    "mod-button2  Raise the window to the top of the stack",
    "mod-button3  Set the window to floating mode and resize by dragging"]

